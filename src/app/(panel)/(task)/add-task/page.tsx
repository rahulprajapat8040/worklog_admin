import Card from "@/components/ui/card/Card";
import TaskForm from "@/features/tasks/TaskForm";
import { API_BASE_URL, API_ENDPOINT } from "@/lib/api/api.constant";
import { ServerApi } from "@/lib/api/serverApi";
import { ICategoryList } from "@/lib/interfaces/ApiResponses/category.interface";
import { IAPIResponse } from "@/lib/interfaces/common/common.interface";
import { TaskStatus } from "@/utils/enum";

const status = [
  { value: TaskStatus.DONE, label: "Done" },
  { value: TaskStatus.PARTIAL, label: "Partial" },
  { value: TaskStatus.HOLD, label: "Hold" },
  { value: TaskStatus.CANCELED, label: "Canceled" },
  { value: TaskStatus.WORKING, label: "Working" },
];

export const dynamic = "force-static";

const getCategories = async () => {
  const { data: res } = await ServerApi<IAPIResponse<ICategoryList>>(
    `${API_BASE_URL}/${API_ENDPOINT.worklog}/category?page=1&limit=20`,
    { method: "GET" }
  );

  return res;
};
const AddTask = async () => {
  const res = await getCategories();
  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold text-foreground mb-6">Add Task</h1>
      <Card className="max-w w-full bg-">
        <TaskForm categories={res.data} taskStatus={status} />
      </Card>
    </div>
  );
};

export default AddTask;
