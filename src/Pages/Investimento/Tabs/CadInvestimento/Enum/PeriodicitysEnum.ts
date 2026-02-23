export enum Periodicitys {
    LiquidezDiaria = '1',
    ThreeMonth = '2',
    SixMonth = '3',
    OneYear = '4'
}

export const PeriodicitysDescription: Record<Periodicitys, string> = {
    [Periodicitys.LiquidezDiaria]: 'Liquidez diária',
    [Periodicitys.ThreeMonth]: '3 meses',
    [Periodicitys.SixMonth]: '6 meses',
    [Periodicitys.OneYear]: '1 ano'
};
