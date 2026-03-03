"use server";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import { ILoginForm } from "@/lib/interfaces/forms/ILoginForm.interface";
import { cookies } from "next/headers";

export const loginAction = async (data: ILoginForm) => {
  try {
    const cookie = await cookies();
    const PATH = `${API_BASE_URL}/${API_ENDPOINT.auth}/login`;
    const res = await ServerApi(PATH, { method: "POST", data });
    if (res.success) {
      cookie.set("accessToken", res.data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24,
      });
      cookie.set("accessToken", res.data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};
