import { callApi } from "./callApi";
import { cookies } from "next/headers";
import { Method } from "@/utils/enum";

type CallAPIOptions<D = any> = {
  method: Method;
  headers?: HeadersInit;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  priority?: RequestPriority;
  signal?: AbortSignal;
  next?: { revalidate: number };
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

export const ServerApi = async <T = any, D = any>(
  endpoint: string,
  options: CallAPIOptions<D>
) => {
  const cookie = await cookies();
  const res = await callApi<T, D>(endpoint, {
    ...options,
    headers: { ...options.headers, Cookie: cookie.toString() },
  });
  return res.data;
};
