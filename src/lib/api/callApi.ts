import { Method } from "@/utils/enum";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export interface IApiErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error: string;
}

export interface ApiResult<T> {
  data: T;
  status: number;
  headers: Headers;
}

interface RefreshTokenResponse {
  accessToken: string;
}

type AuthExcludedEndpoint =
  | "login"
  | "forgot"
  | "sign-up"
  | "reset-password"
  | "refresh-token";
const authExcludedUrls: AuthExcludedEndpoint[] = [
  "login",
  "forgot",
  "sign-up",
  "reset-password",
  "refresh-token",
];

type CallAPIOptions<D = any> = {
  method: Method;
  headers?: HeadersInit;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  priority?: RequestPriority;
  signal?: AbortSignal;
  body?: BodyInit;
  next?: { revalidate: number; tags?: string[] };
  multipart?: boolean;
} & (
  | { method: "GET" | "HEAD"; data?: Record<string, any> }
  | {
      method: "POST" | "PUT" | "PATCH" | "DELETE";
      data?: D;
      multipart?: boolean;
    }
);

export const callApi = async <T = any, D = any>(
  endpoint: string,
  options: CallAPIOptions<D>
): Promise<ApiResult<T>> => {
  const url = new URL(endpoint);
  const headers = new Headers(options.headers);

  if (["GET", "HEAD"].includes(options.method) && options.data) {
    Object.entries(options.data).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  let body: BodyInit | undefined;
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(options.method) &&
    options.data
  ) {
    if (options.multipart && options.data instanceof FormData) {
      body = options.data;
    } else {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(options.data);
    }
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
    body,
    referrerPolicy: "strict-origin-when-cross-origin",
  };

  try {
    const response = await fetch(url.toString(), fetchOptions);

    // ❗ important: non-OK responses are still valid fetch responses
    if (!response.ok) {
      return await handleError(response, url.toString(), fetchOptions);
    }

    return await handleResponse<T>(response);
  } catch (error) {
    return await handleError(error, url.toString(), fetchOptions);
  }
};

const handleResponse = async <T>(response: Response): Promise<ApiResult<T>> => {
  let data: any = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else if (contentType?.includes("text/")) {
    data = await response.text();
  } else {
    data = await response.arrayBuffer();
  }
  return {
    data,
    status: response.status,
    headers: response.headers,
  };
};

const handleError = async <T>(
  error: unknown,
  url: string,
  config: RequestInit
): Promise<ApiResult<T>> => {
  // 🔥 already formatted error → rethrow
  if (typeof error === "object" && error !== null && "statusCode" in error) {
    throw error;
  }

  // 🌐 network error
  if (error instanceof TypeError) {
    throw {
      statusCode: 0,
      message: "Network error - failed to connect to server",
    };
  }

  // 🌐 HTTP error
  if (error instanceof Response) {
    let errorData: Partial<IApiErrorResponse> = {};

    try {
      errorData = await error.json();
    } catch {
      errorData.message = error.statusText;
    }

    if (error.status === 401 && !isAuthExcluded(url)) {
      if (
        errorData.message === "INVALID_TOKEN" ||
        errorData.message === "TOKEN_EXPIRED"
      ) {
        try {
          await fetch("/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
          });

          const retry = await fetch(url, config);
          if (retry.ok) {
            return handleResponse<T>(retry);
          }
        } catch {
          // logoutUser();
        }
      }
    }
    throw {
      statusCode: error.status,
      message: errorData.message || "Request failed",
    };
  }

  // ❌ unknown shape
  throw {
    statusCode: -1,
    message: "Unexpected error occurred",
  };
};

// Auth exclusion check
const isAuthExcluded = (endpoint: string): boolean => {
  return authExcludedUrls.some((pattern) => endpoint.includes(pattern));
};

export interface ApiError {
  statusCode: number;
  message?: string;
}

/**
 * Reusable error handler for forms
 * @param err - The API error (with statusCode + message)
 * @param setError - react-hook-form setError function
 * @param map - Mapping of statusCodes to form fields + custom messages
 */
export function handleFormApiError<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
  map: Record<
    number,
    {
      field: Path<T>; // which field gets the error
      message?: string; // custom error message
    }
  >
) {
  const error = err as Partial<ApiError>;
  const config = map[error?.statusCode ?? -1];

  if (config) {
    setError(config.field, {
      type: "manual",
      message: config.message || error.message || "Something went wrong",
    });
  } else {
    // fallback → general error
    setError(Object.keys(map)[0] as Path<T>, {
      type: "manual",
      message: error?.message || "Unexpected error occurred",
    });
  }
}

export const ThrowError = (error: unknown, helperText = "Error in API") => {
  const err = error as { message: string };
  // showToastNotification("danger", err.message);
  console.log(helperText, error);
};
