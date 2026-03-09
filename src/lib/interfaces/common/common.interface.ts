import { LucideIcon } from "lucide-react";

export interface IAPIResponse<T> {
  message: string;
  status: number;
  data: T;
  success: boolean;
}

export interface IPageInfo {
  total: number;
  currentpage: number;
  totalPage: number;
  limit: number;
}

export interface IOption {
  value: string;
  label: string;
}


export interface INavItems {
  title: string
  url: string
  icon: LucideIcon
}