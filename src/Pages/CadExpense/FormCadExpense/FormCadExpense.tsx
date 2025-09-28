import { LocalizationProvider } from '@mui/x-date-pickers'
import style from './FormCadExpense.module.css'
import {  ChangeEvent } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UseCadExpense from '../UseCadExpense';
import CheckBoxCommon from '../../../Components/CheckBox/CheckBoxCommon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ConvertStringToNumber } from '../../../Utils/Date/ConvertNumber';
import InputCommonMUI from '../../../Components/Input/InputCommonMUI';
import { FormDataCadExpense, schemaCadExpense } from './SchemasValidation';

export default function FormCadExpense() {
    const {
        Save,
        expense,
        setDate,
        setDescription,
        setBePaid,
        setValue,
      } = UseCadExpense()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataCadExpense>(
        {
            resolver: zodResolver(schemaCadExpense),
            mode: "onChange"
        }
    )      
    
    function handleOnChangeValue(e: ChangeEvent<HTMLInputElement>) {
        setValue(ConvertStringToNumber(e.target.value))                
    }

    function handleOnChangeDescription(e: ChangeEvent<HTMLInputElement>) {        
        setDescription(e.target.value)        
    }

    const handleSubmitForm = () => {             
        Save()
    };  

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
        
            <div className={style.containerFields}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                    <DatePicker
                        label="Date"
                        value={dayjs(expense?.date ?? new Date().valueOf())}
                        onChange={(newValue) =>  setDate(newValue?.toDate())}
                        sx={{width: '100%'}}                        
                        format="DD/MM/YYYY"
                    />
                    
                </LocalizationProvider>

                <InputCommonMUI 
                    title='Descrição'
                    name='description'
                    error={errors.description?.message}
                    register={register}          
                    value={expense?.description}         
                    handlerOnChange={handleOnChangeDescription}
                />                                
                
                <InputCommonMUI                    
                    error={errors.value?.message}
                    register={register}
                    name="value"
                    title='Valor' 
                    value={expense?.value} 
                    handlerOnChange={handleOnChangeValue}/>

                <CheckBoxCommon 
                    title='Pago' 
                    name='bePaid'                             
                    checked={expense?.bePaid ?? false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBePaid(e.target.checked)}/>

                <button type='submit' className={style.button}>Gravar</button>                           
            </div>          
        
        </form>      
    )
}