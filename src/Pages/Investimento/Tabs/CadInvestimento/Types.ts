export interface Investimento {
    title: string
    value: string
    dateFim: number
    idCorretora?: number
    periodicidade: string    
}

export function defaultCadInvestimento() : Investimento {
    return {
        value: '0',
        title: '',
        periodicidade: '1',
        dateFim: new Date().valueOf()
    }
}