import PageHeading from "@/components/common/PageHeading";
import ProgressBar from "@/components/common/ProgressBar";
import StatusText from "@/components/common/StatusText";
import Button from "@/components/ui/button/Button";
import AnalyticCard from "@/components/ui/card/AnalyticCard";
import Card from "@/components/ui/card/Card";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import {
  ITaskAnalytics,
  ITaskData,
} from "@/lib/interfaces/ApiResponses/taskList.interface";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { formatDate, formatTimeTaken, statusColors } from "@/utils/helper";
import {
  CalendarCheck,
  CalendarX,
  Clock,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface IDashboardRes {
  analytics: ITaskAnalytics;
  recentTasks: ITaskData[];
}

const Dashboard = async () => {
  const { data: res } = await ServerApi<IAPIResponse<IDashboardRes>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/employee/dashboard`,
    { method: "GET" }
  );
  const progressPer = (res.analytics.activeDays / 31) * 100;
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <PageHeading
          heading="Good morning, John 👋"
          description="Thursday, February 26, 2026"
        />
        <Link href="/add-task">
          <Button className="flex items-center px-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticCard
          Icon={TrendingUp}
          title={res.analytics.task}
          subTitle="Task this month"
          colorClass="primary"
        />
        <AnalyticCard
          Icon={Clock}
          title={res.analytics.totalHours}
          subTitle="Total Hours"
          colorClass="info"
        />
        <AnalyticCard
          Icon={CalendarCheck}
          title={res.analytics.activeDays}
          subTitle="Days logged"
          colorClass="success"
        />
        <AnalyticCard
          Icon={CalendarX}
          title="8"
          subTitle="Days missed"
          colorClass="destructive"
        />
      </div>
      <Card className="my-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">
            Monthly Progress
          </p>
          <p className="text-sm text-muted-foreground">
            {res.analytics.activeDays}/{31} days
          </p>
        </div>
        <ProgressBar value={progressPer} />
      </Card>
      <Card>
        <div className="flex items-center justify-between py-3">
          <PageHeading heading="Recent Task" className="text-xl" />
          <Link href="/tasks" className="text-primary text-sm">
            <Button variant="ghost">View all</Button>
          </Link>
        </div>
        {res.recentTasks.map((task) => {
          const status = statusColors[task.taskStatus];
          return (
            <div
              key={task.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-foreground truncate">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusText
                    text={task.category.name}
                    color={task.category.colorCode}
                  />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(task.date)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-muted-foreground">
                  {formatTimeTaken(task.timeTaken)}
                </span>
                <StatusText text={status.text} className={status.class} />
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
};
export default Dashboard;
