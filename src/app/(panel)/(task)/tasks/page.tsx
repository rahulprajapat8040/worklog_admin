import PageHeading from "@/components/common/PageHeading";
import Searchbar from "@/components/common/Searchbar";
import Button from "@/components/ui/button/Button";
import MonthSelector from "@/features/tasks/MonthSelector";
import TaskAnalytics from "@/features/tasks/TaskAnalytics";
import TaskTable from "@/features/tasks/TaskTable";

import { formatMonth, getMonthOptions } from "@/utils/helper";
import { Download } from "lucide-react";

interface SearchProps {
  page: number;
  limit: number;
  search: string;
  month: string;
}

const TaskHistory = async ({
  searchParams,
}: {
  searchParams: Promise<SearchProps>;
}) => {
  const { page = 1, limit = 10, search, month } = await searchParams;

  const today = new Date();
  const defaultMonth = formatMonth(today);
  const selectedMonth = month || defaultMonth;
  const options = getMonthOptions(selectedMonth);

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
          <MonthSelector selectedMonth={selectedMonth} options={options} />
        </div>
        <div className="col-span-11">
          <Searchbar pageLink="/tasks" />
        </div>
      </div>
      <TaskAnalytics month={selectedMonth} />
      <TaskTable
        page={page}
        limit={limit}
        month={selectedMonth}
        search={search}
      />
    </>
  );
};

export default TaskHistory;
