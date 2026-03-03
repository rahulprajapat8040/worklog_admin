export type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export enum TaskStatus {
  DONE = "DONE",
  PARTIAL = "PARTIAL",
  HOLD = "HOLD",
  CANCELED = "CANCELED",
  WORKING = "WORKING",
}

export enum Visiblity {
  PUBLIC = "PUBLIC",
  DRAFT = "DRAFT",
}
