export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  tableClassName?: string;
  minHeight?: string;
  emptyMessage?: string;
  loading?: boolean;
}
