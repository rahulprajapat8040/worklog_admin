import { API_BASE_URL, API_ENDPOINT } from "../api/api.constant";
import { ServerApi } from "../api/serverApi";
import { IComparisonChart } from "../interfaces/common/chart.interface";
import { IAPIResponse } from "../interfaces/common/common.interface";

export const getMyInsights = async () => {
  const res = await ServerApi<IAPIResponse<IComparisonChart[]>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/analytics/my-insights`,
    { method: "GET" }
  );
  return res;
};
