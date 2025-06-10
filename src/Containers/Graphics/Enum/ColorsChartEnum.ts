export enum ColorsChartEnum {
    GREEN = '#4B5320',
    YELLOW = '#E6B800',
    RED = '#800000'
}

export type ColorsChartType = `${(typeof ColorsChartEnum)[keyof typeof ColorsChartEnum]}`