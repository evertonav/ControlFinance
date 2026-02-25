import { EntityInvestimento } from "../../../../Services/Investimento/types"
import { Periodicitys } from "./Enum/PeriodicitysEnum"

export type Investimento = Pick<EntityInvestimento, 'title' | 'value' | 'dateFim' | 'idCorretora'> & {
    periodicidade: Periodicitys
}
     

export function defaultCadInvestimento(idCorretora?: number) : Investimento {
    return {
        value: '0',
        title: '',
        periodicidade: Periodicitys.LiquidezDiaria,
        dateFim: new Date().valueOf(),
        idCorretora: idCorretora
    }
}