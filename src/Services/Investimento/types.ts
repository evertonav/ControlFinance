export interface EntityInvestimento {
    id?: string
    title: string
    value: string
    dateFim: number
    idCorretora?: number
    periodicidade: number    
    user: string
}

export type AddInvestimentoRequest = Omit<EntityInvestimento, 'id'>