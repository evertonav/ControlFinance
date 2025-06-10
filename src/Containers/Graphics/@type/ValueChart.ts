import { ColorsChartType } from "../Enum/ColorsChartEnum";

export interface ValueChart {
    id: number;
    value: number;
    label: string;
    color: ColorsChartType;
  }