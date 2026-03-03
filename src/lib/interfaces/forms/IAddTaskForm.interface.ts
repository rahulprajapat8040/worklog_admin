import { TaskStatus, Visiblity } from "@/utils/enum";

export interface IAddTaskForm {
  date: string | Date;
  title: string;
  categoryId: string;
  projectName: string;
  timeTaken: string;
  taskStatus: TaskStatus;
  description: string;
  visiblity: Visiblity;
}
