// src/lib/api.ts

import { Method } from "@/utils/enum";

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
  next?: { revalidate: number };
  signal?: AbortSignal;
  body?: BodyInit;
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

  const response = await fetchWithRetry(url.toString(), fetchOptions);
  // ❗ important: non-OK responses are still valid fetch responses
  if (!response.ok) {
    await handleError(response);
  }

  return await handleResponse<T>(response);
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

const handleError = async (response: Response): Promise<never> => {
  let errorData: IApiErrorResponse;

  try {
    errorData = await response.json();
  } catch {
    throw new Error(response.statusText);
  }

  throw new ApiError(errorData);
};

async function fetchWithRetry(
  url: string,
  config: RequestInit
): Promise<Response> {
  try {
    return await fetch(url, config);
  } catch (err) {
    throw err;
  }
}

// src/lib/ApiError.ts
export class ApiError extends Error {
  statusCode: number;
  timestamp?: string;
  path?: string;
  error?: string;

  constructor(response: IApiErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.timestamp = response.timestamp;
    this.path = response.path;
    this.error = response.error;
  }
}
