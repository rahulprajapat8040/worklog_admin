import LongText from "@/components/common/LongText";
import StatusText from "@/components/common/StatusText";
import Table from "@/components/common/Table";
import Card from "@/components/ui/card/Card";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import {
  ITaskData,
  ITaskList,
} from "@/lib/interfaces/ApiResponses/taskList.interface";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { TableColumn } from "@/lib/interfaces/common/table.interface";
import { formatDate, formatTimeTaken, statusColors } from "@/utils/helper";

const TaskHistory = async () => {
  const { data: task } = await ServerApi<IAPIResponse<ITaskList>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/task?page=1&limit=10`,
    { method: "GET" }
  );

  const columns: TableColumn<ITaskData>[] = [
    {
      key: "date",
      header: "Date",
      render: (item) => {
        return formatDate(item.date);
      },
    },
    {
      key: "title",
      header: "Title",
      render: (item) => {
        return <LongText text={item.title} />;
      },
    },
    {
      key: "category",
      header: "Category",
      render: (item) => {
        return (
          <StatusText
            text={item.category.name}
            color={item.category.colorCode}
          />
        );
      },
    },
    {
      key: "timeTaken",
      header: "Time",
      render: (item) => {
        return formatTimeTaken(item.timeTaken);
      },
    },
    {
      key: "taskStatus",
      header: "Status",
      render: (item) => {
        const status = statusColors[item.taskStatus];
        return <StatusText text={status.text} className={status.class} />;
      },
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 mb-5 gap-5">
        <Card>
          <div className="text-center">
            <h4 className="text-3xl font-semibold">15</h4>
            <span className="text-sm text-muted-foreground">Total Task</span>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h4 className="text-3xl font-semibold">15</h4>
            <span className="text-sm text-muted-foreground">Total Task</span>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h4 className="text-3xl font-semibold">15</h4>
            <span className="text-sm text-muted-foreground">Total Task</span>
          </div>
        </Card>
      </div>
      <Table data={task.data} columns={columns} />
    </>
  );
};

export default TaskHistory;
