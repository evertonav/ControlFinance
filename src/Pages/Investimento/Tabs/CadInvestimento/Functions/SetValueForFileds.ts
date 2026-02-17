import { CadInvestimento } from "../Types";

type FieldsString = 'title' | 'value' | 'periodicidade'   

export function setInvestimentoForField(
    setInvestimento: (investimento: CadInvestimento) => void, 
    field: FieldsString, 
    value: string,
    investimento: CadInvestimento) 
{
    let investimentoInternal: CadInvestimento;
  
    investimentoInternal = { ...investimento }      
    investimentoInternal[field] = value
    
    setInvestimento(investimentoInternal)
}