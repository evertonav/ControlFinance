import { useState } from "react";
import { CadInvestimento, defaultCadInvestimento } from "../Types";
import { setInvestimentoForField } from "../Functions/SetValueForFileds";

export function useTabCadInvestimento() {
    const [investimento, setInvestimento] = useState<CadInvestimento>(defaultCadInvestimento())

    function setTitle(value: string) {
        setInvestimentoForField(setInvestimento, 'title', value, investimento)        
    }

    function setDateFinish(value?: Date) {
        let investimentoInternal: CadInvestimento;
        
        investimentoInternal = { ...investimento }      
        investimentoInternal.dateFim = value?.valueOf() ?? new Date().valueOf()
            
        setInvestimento(investimentoInternal) 
    }

    function setValue(value?: number) {
        setInvestimentoForField(setInvestimento, 'value', value?.toString() ?? '0', investimento)        
    }

    function setIdCorretora(value?: number) {
        let investimentoInternal: CadInvestimento;
        
        investimentoInternal = { ...investimento }      
        investimentoInternal.idCorretora = value
            
        setInvestimento(investimentoInternal) 
    }

    function setPeriodicidade(value?: string) {
        setInvestimentoForField(setInvestimento, 'periodicidade', value ?? '1', investimento)        
    }

    return {
        investimento,
        setTitle,
        setDateFinish,
        setValue, 
        setIdCorretora,
        setPeriodicidade
    }
}