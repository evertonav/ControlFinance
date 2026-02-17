import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputCommonMUI from "../../../../Components/Input/InputCommonMUI";
import { ContainerFields } from "../../../../Containers/Fields/ContainerFields";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { ButtonCommom } from '../../../../Components/Button/ButtonCommon';
import { RadioGroupCommom } from '../../../../Components/RadrioGroup/RadioGroupCommom';
import { ComboBox } from '../../../../Components/ComboBox/ComboBox';
import { useTabCadInvestimento } from './Hooks/TabCadInvestimentoHook';
import { ConvertStringToNumber } from '../../../../Utils/Date/ConvertNumber';
import { useOptionsCorretora } from './Hooks/OptionsCorretoraHook';
import { useOptionsPeriodicity } from './Hooks/OptionsPeriodicityHook';

export function TabCadInvestimento() {
    const { 
        investimento, 
        setTitle, 
        setDateFinish, 
        setValue, 
        setIdCorretora,
        setPeriodicidade 
    } = useTabCadInvestimento()

    const { optionsCorretora } = useOptionsCorretora()
    const { optionsPeriodicity } = useOptionsPeriodicity()

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            console.log(investimento)
        }}>
            <ContainerFields>
                <InputCommonMUI 
                    title='Título'
                    name='title'
                    //error={errors.description?.message}
                    //register={register}          
                    value={investimento.title}         
                    handlerOnChange={(event) => setTitle(event.target.value)}
                />  

                <InputCommonMUI 
                    title='Valor'
                    name='value'
                    //error={errors.description?.message}
                    //register={register}          
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
                            value: investimento.idCorretora ?? null, 
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