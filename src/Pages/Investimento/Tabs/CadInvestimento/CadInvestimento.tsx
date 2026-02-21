import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputCommonMUI from "../../../../Components/Input/InputCommonMUI";
import { ContainerFields } from "../../../../Containers/Fields/ContainerFields";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { ButtonCommom } from '../../../../Components/Button/ButtonCommon';
import { RadioGroupCommom } from '../../../../Components/RadrioGroup/RadioGroupCommom';
import { ComboBox } from '../../../../Components/ComboBox/ComboBox';
import { useCadInvestimento } from './Hooks/CadInvestimentoHook';
import { ConvertStringToNumber } from '../../../../Utils/Date/ConvertNumber';
import { Investimento } from './Types';
import { useForm } from 'react-hook-form';
import { FormDataCadInvestimento, schemaCadInvestimento } from './Schemas/SchemasValidationCadInvestimento';
import { zodResolver } from '@hookform/resolvers/zod';
import { Corretoras } from './Enum/CorretorasEnum';

interface CadInvestimentoProps {
    onSuccess: (value: Investimento) => void
}

export function CadInvestimento({ onSuccess } : CadInvestimentoProps) {
    const { 
        investimento, 
        setTitle, 
        setDateFinish, 
        setValue, 
        setIdCorretora,
        setPeriodicidade,
        optionsCorretora,
        optionsPeriodicity
    } = useCadInvestimento()

    

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataCadInvestimento>(
        {
            resolver: zodResolver(schemaCadInvestimento),
            mode: "onChange"
        }
    )   

    return (
        <form onSubmit={handleSubmit(() => onSuccess(investimento))}>
            <ContainerFields>
                <InputCommonMUI 
                    title='Título'
                    name='title'
                    error={errors.title?.message}
                    register={register}          
                    value={investimento.title}         
                    handlerOnChange={(event) => setTitle(event.target.value)}
                />  

                <InputCommonMUI 
                    title='Valor'
                    name='value'
                    error={errors.value?.message}
                    register={register}          
                    value={investimento.value}         
                    handlerOnChange={(event) => setValue(ConvertStringToNumber(event.target.value))}
                />  

                <DatePicker
                    label="Data Fim"
                    value={dayjs(investimento.dateFim)} 
                    onChange={(newValue) =>  setDateFinish(newValue?.toDate())}                   
                    sx={{width: '100%'}}                        
                    format="DD/MM/YYYY"
                />                
                
                <FormControl sx={{width: '100%'}}>
                    <ComboBox 
                        title={{children: 'Corretora'}} 
                        combo={
                        {
                            label: "Corretora", 
                            value: investimento.idCorretora ?? Corretoras.NuBank, 
                            onChange: (event) => {
                                setIdCorretora(event.target.value as number | undefined)
                            }
                        }} 
                        
                        itensCombo={optionsCorretora}/>
                </FormControl>
                
                <FormControl sx={{width: '100%'}}>
                    <RadioGroupCommom 
                        title={{children: 'Periodicidade'}}
                        group={
                            { 
                                "aria-labelledby": "demo-radio-buttons-group-label",
                                defaultValue: "female",
                                name: "radio-buttons-group",
                                value: investimento.periodicidade,
                                onChange: (event) => setPeriodicidade(event.target.value)

                            }
                        } 
                        itensRadio={optionsPeriodicity} />
                </FormControl>                

                <ButtonCommom type='submit'>Gravar</ButtonCommom>  
            </ContainerFields>
        </form>)
}