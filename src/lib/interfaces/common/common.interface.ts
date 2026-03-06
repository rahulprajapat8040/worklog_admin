export interface IAPIResponse<T> {
  message: string;
  status: number;
  data: T;
  success: boolean;
}

export interface IPageInfo {
  total: number;
  currentPage: number;
  totalPage: number;
  limit: number;
}

export interface IOption {
  value: string;
  label: string;
}
