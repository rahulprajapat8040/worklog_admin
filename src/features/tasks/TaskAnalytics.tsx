import Card from "@/components/ui/card/Card";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import { ITaskAnalytics } from "@/lib/interfaces/ApiResponses/taskList.interface";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { GetFilterUrl } from "@/utils/helper";
import { cache } from "react";

interface Props {
  month: string;
}

const fetchAnalytics = cache(async (month: string) => {
  const query = GetFilterUrl({ month });
  const { data } = await ServerApi(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/task/analytics?${query}`,
    { method: "GET", next: { revalidate: 70, tags: ["tasks"] } }
  );
  return data;
});

const TaskAnalytics = async ({ month }: Props) => {
  const analytics = await fetchAnalytics(month);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mb-5 gap-5">
      <Card>
        <div className="text-center">
          <h4 className="text-3xl font-semibold">{analytics.task}</h4>
          <span className="text-sm text-muted-foreground">Total Task</span>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <h4 className="text-3xl font-semibold">{analytics.totalHours}</h4>
          <span className="text-sm text-muted-foreground">Total Hours</span>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <h4 className="text-3xl font-semibold">{analytics.activeDays}</h4>
          <span className="text-sm text-muted-foreground">Days Active</span>
        </div>
      </Card>
    </div>
  );
};

export default TaskAnalytics;
