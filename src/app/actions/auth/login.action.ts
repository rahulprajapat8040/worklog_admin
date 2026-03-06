"use server";

import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { ILoginForm } from "@/lib/interfaces/forms/ILoginForm.interface";
import { cookies } from "next/headers";

interface AuthRes {
  accessToken: string;
  refreshToken: string;
}

export const loginAction = async (data: ILoginForm) => {
  try {
    const cookieStore = await cookies();

    const PATH = `${API_BASE_URL}/${API_ENDPOINT.auth}/login`;

    const res = await ServerApi<IAPIResponse<AuthRes>>(PATH, {
      method: "POST",
      data,
    });

    if (!res?.success) {
      return {
        success: false,
        message: String(res?.message ?? "Login failed"),
      };
    }

    console.log("res is", res);

    cookieStore.set("accessToken", res.data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", res.data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "ok" };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      message: err.message,
    };
  }
};
