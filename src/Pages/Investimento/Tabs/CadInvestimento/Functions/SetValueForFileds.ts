import { Investimento } from "../Types";

type FieldsString = 'title' | 'value' | 'periodicidade'   

export function setInvestimentoForField(
    setInvestimento: (investimento: Investimento) => void, 
    field: FieldsString, 
    value: string,
    investimento: Investimento) 
{
    let investimentoInternal: Investimento;
  
    investimentoInternal = { ...investimento }      
    investimentoInternal[field] = value
    
    setInvestimento(investimentoInternal)
}