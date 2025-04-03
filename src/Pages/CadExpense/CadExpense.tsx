import {  ChangeEvent, FormEvent } from 'react'
import style from './CadExpense.module.css'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ListExpense from './ListExpense/ListExpense'
import InputCommon from '../../Components/Input/InputCommon'
import CheckBoxCommon from '../../Components/CheckBoxCommon';
import UseCadExpense from './UseCadExpense';


export default function CadExpense() {  
  const {
    Save,
    expense,
    setDate,
    setDescription,
    setBePaid,
    setValue,
  } = UseCadExpense()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();   

    Save()
  };  

  return (
  
      <form className={style.containerForm} onSubmit={handleSubmit}>
        
        <div className={style.containerFields}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
              <DatePicker
                label="Data"
                value={dayjs(expense?.date ?? new Date().valueOf())}
                onChange={(newValue) =>  setDate(newValue?.toDate())}
              />
            
          </LocalizationProvider>

          <InputCommon 
            classNameContainer={style.inputTamanho}            
            classNameContainerInput={style.inputTamanho}
            className={style.colorBlack}
            title='Descrição' 
            value={expense?.description ?? ''} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>      
          
          <InputCommon
              classNameContainer={style.inputTamanho}            
              classNameContainerInput={style.inputTamanho}
              className={style.colorBlack}
              title='Valor' 
              value={expense?.value ?? 0} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}/>

          <CheckBoxCommon 
            title='Pago' 
            checked={expense?.bePaid ?? false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBePaid(e.target.checked)}/>

          <button type='submit' className={style.button}>Gravar</button>

          <ListExpense /> 
          
        </div>          
        
      </form>            
  )
}