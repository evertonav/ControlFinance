import { useState } from "react";
import {  defaultCadInvestimento, Investimento } from "../Types";
import { setInvestimentoForField } from "../Functions/SetValueForFileds";
import { useOptionsCorretora } from "./OptionsCorretoraHook";
import { useOptionsPeriodicity } from "./OptionsPeriodicityHook";

export function useCadInvestimento() {
    const [investimento, setInvestimento] = useState<Investimento>(defaultCadInvestimento())
    const { optionsCorretora } = useOptionsCorretora()
    const { optionsPeriodicity } = useOptionsPeriodicity()

    function setTitle(value: string) {
        setInvestimentoForField(setInvestimento, 'title', value, investimento)        
    }

    function setDateFinish(value?: Date) {
        let investimentoInternal: Investimento;
        
        investimentoInternal = { ...investimento }      
        investimentoInternal.dateFim = value?.valueOf() ?? new Date().valueOf()
            
        setInvestimento(investimentoInternal) 
    }

    function setValue(value?: number) {
        setInvestimentoForField(setInvestimento, 'value', value?.toString() ?? '0', investimento)        
    }

    function setIdCorretora(value?: number) {
        let investimentoInternal: Investimento;
        
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
        setPeriodicidade,
        optionsCorretora,
        optionsPeriodicity
    }
}