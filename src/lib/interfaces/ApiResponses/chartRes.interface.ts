import { IComparisonChart, IPieChart } from "../common/chart.interface";

export interface IMyInsights {
  workHourTarget: IComparisonChart[];
  timeByCategory: IPieChart[];
}
