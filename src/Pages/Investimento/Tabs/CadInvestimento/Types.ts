import { Periodicitys } from "./Enum/PeriodicitysEnum"

export interface Investimento {
    title: string
    value: string
    dateFim: number
    idCorretora?: number
    periodicidade: Periodicitys    
}

export function defaultCadInvestimento() : Investimento {
    return {
        value: '0',
        title: '',
        periodicidade: Periodicitys.LiquidezDiaria,
        dateFim: new Date().valueOf()
    }
}