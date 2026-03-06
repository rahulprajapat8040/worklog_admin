"use server";

import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import { IAddTaskForm } from "@/lib/interfaces/forms/IAddTaskForm.interface";

export const addTaskAction = async (data: IAddTaskForm) => {
  try {
    const PATH = `${API_BASE_URL}/${API_ENDPOINT.worklog}/task`;

    const res = await ServerApi(PATH, {
      method: "POST",
      data,
    });

    if (res.success) {
      return { success: true };
    }

    return {
      success: false,
      message: "Unable to add task",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
