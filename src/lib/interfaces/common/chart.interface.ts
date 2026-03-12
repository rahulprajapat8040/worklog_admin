export interface IComparisonChart {
  key: string;
  values: string[] | number[];
}

export interface IPieChart {
  label: string;
  value: number;
  color: string;
}
