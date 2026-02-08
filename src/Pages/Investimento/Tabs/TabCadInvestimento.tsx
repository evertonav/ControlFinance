import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputCommonMUI from "../../../Components/Input/InputCommonMUI";
import { ContainerFields } from "../../../Containers/Fields/ContainerFields";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { ButtonCommom } from '../../../Components/Button/ButtonCommon';
import { RadioGroupCommom } from '../../../Components/RadrioGroup/RadioGroupCommom';
import { ComboBox } from '../../../Components/ComboBox/ComboBox';

export function TabCadInvestimento() {
    return (
        <form>
            <ContainerFields>
                <InputCommonMUI 
                    title='Título'
                    name='title'
                    //error={errors.description?.message}
                    //register={register}          
                    //value={expense?.description}         
                    //handlerOnChange={handleOnChangeDescription}
                />  

                <InputCommonMUI 
                    title='Valor'
                    name='value'
                    //error={errors.description?.message}
                    //register={register}          
                    //value={expense?.description}         
                    //handlerOnChange={handleOnChangeDescription}
                />  

                <DatePicker
                    label="Data Fim"
                    value={dayjs(new Date())}                    
                    sx={{width: '100%'}}                        
                    format="DD/MM/YYYY"
                />                
                
                <FormControl sx={{width: '100%'}}>
                    <ComboBox 
                        title={{children: 'Corretora'}} 
                        combo={{label: "Corretora"}} 
                        itensCombo={[
                            {value: 1, children: 'Ten'}
                        ]}/>
                </FormControl>
                

                <FormControl sx={{width: '100%'}}>
                    <RadioGroupCommom 
                        title={{children: 'Periodicidade'}}
                        group={
                            { "aria-labelledby": "demo-radio-buttons-group-label",
                            defaultValue: "female",
                            name: "radio-buttons-group"
                            }
                        } 
                        itensRadio={[
                            {value: "male", label: "Liquidez diária"},
                            {value: "male", label: "3 meses"},
                            {value: "2", label: "6 meses"},
                            {value: "3", label: "1 ano"}]} />
                </FormControl>
                

                <ButtonCommom type='submit'>Gravar</ButtonCommom>  
            </ContainerFields>
        </form>)
}