import LongText from "@/components/common/LongText";
import Pagination from "@/components/common/Pagination";
import StatusText from "@/components/common/StatusText";
import Table from "@/components/common/Table";
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

interface SearchProps {
  page: number;
  limit: number;
  search: string;
  month: string;
}

const TaskTable: React.FC<SearchProps> = async ({
  page,
  limit,
  search,
  month,
}) => {
  const query = GetFilterUrl({ page, limit, search, month });
  const { data: task } = await ServerApi<IAPIResponse<ITaskList>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/task?${query ? query : ""}`,
    {
      method: "GET",
    }
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
      <Table data={task.data} columns={columns} />
      <Pagination pageLink="/tasks" paginationData={task.pageInfo} />
    </>
  );
};

export default TaskTable;
