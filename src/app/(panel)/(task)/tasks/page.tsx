import LongText from "@/components/common/LongText";
import PageHeading from "@/components/common/PageHeading";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import StatusText from "@/components/common/StatusText";
import Table from "@/components/common/Table";
import Button from "@/components/ui/button/Button";
import Card from "@/components/ui/card/Card";
import MonthSelector from "@/features/tasks/MonthSelector";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import {
  ITaskData,
  ITaskList,
} from "@/lib/interfaces/ApiResponses/taskList.interface";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { TableColumn } from "@/lib/interfaces/common/table.interface";
import {
  formatDate,
  formatTimeTaken,
  GetFilterUrl,
  statusColors,
} from "@/utils/helper";
import { Download } from "lucide-react";

interface SearchProps {
  page: number;
  limit: number;
  search: string;
}
const TaskHistory = async ({
  searchParams,
}: {
  searchParams: Promise<SearchProps>;
}) => {
  const { page = 1, limit = 10, search } = await searchParams;
  const query = GetFilterUrl({ page, limit, search });
  const { data: task } = await ServerApi<IAPIResponse<ITaskList>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/task?${query ? query : ""}`,
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
      <div className="mb-5 flex items-center justify-between gap-2">
        <PageHeading heading="Task History" />
        <Button
          variant="outline"
          className="text-sm capitalize flex items-center gap-3 px-4 py-2.5 font-medium"
        >
          <Download size={18} />
          Export to excel
        </Button>
      </div>
      <div className="mb-6 grid grid-cols-14 gap-5 items-center">
        <div className="col-span-3">
          <MonthSelector />
        </div>
        <div className="col-span-11">
          <Searchbar pageLink="/tasks" />
        </div>
      </div>
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
      <Pagination pageLink="/tasks" paginationData={task.pageInfo} />
    </>
  );
};

export default TaskHistory;
