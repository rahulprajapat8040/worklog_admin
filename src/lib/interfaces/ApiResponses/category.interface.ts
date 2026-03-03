import { IPageInfo } from "../common/common.interface";

export interface ICategoryList {
  data: ICategory[];
  pageInfo: IPageInfo;
}

export interface ICategory {
  id: string;
  name: string;
}
