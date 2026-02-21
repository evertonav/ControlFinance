export enum Corretoras {
    NuBank = '1',
    PicPay = '2',
    Inter = '3',
    Binance = '4'
}

export const CorretorasDescricao: Record<Corretoras, string> = {
    [Corretoras.NuBank]: 'NuBank',
    [Corretoras.PicPay]: 'PicPay',
    [Corretoras.Inter]: 'Banco Inter',
    [Corretoras.Binance]: 'Binance'
};

