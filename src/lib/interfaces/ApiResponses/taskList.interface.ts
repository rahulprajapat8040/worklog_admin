import { TaskStatus } from "@/utils/enum";
import { IPageInfo } from "../common/common.interface";

export interface ITaskList {
  data: ITaskData[];
  pageInfo: IPageInfo;
}

export interface ITaskData {
  id: string;
  title: string;
  description: string;
  taskStatus: TaskStatus;
  date: string;
  timeTaken: string;
  visiblity: string;
  projectName: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  category: Category;
}

export interface Category {
  name: string;
  id: string;
  colorCode: string;
}
