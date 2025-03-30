import {  ChangeEvent, FormEvent, useContext } from 'react'
import style from './CadExpense.module.css'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ListExpense from '../../Features/ListExpense/ListExpense'
import InputCommon from '../../Components/Input/InputCommon'
import CheckBoxCommon from '../../Components/CheckBoxCommon';
import { ExpenseContext } from '../../Contexts/CRUDExpense';

export default function CadExpense() {  
  const { 
    expense, 
    update, 
    setExpense, 
    add 
  } = useContext(ExpenseContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();   

    if (expense?.id) {      
      await update()      
    } 
    else {    
      add()      
    }
  };  

  return (
  
      <form className={style.containerForm} onSubmit={handleSubmit}>      
        <div className={style.containerFields}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
              <DatePicker
                label="Data"
                value={dayjs(expense?.date ?? new Date().valueOf())}
                onChange={(newValue) =>  setExpense({
                  bePaid: expense?.bePaid ?? false,
                  date: newValue?.toDate().valueOf() ?? 0,
                  description: expense?.description ?? '',
                  value: expense?.value ?? 0,
                  id: expense?.id
                })}
              />
            
          </LocalizationProvider>

          <InputCommon 
            classNameContainer={style.inputTamanho}            
            classNameContainerInput={style.inputTamanho}
            title='Descrição' 
            value={expense?.description ?? ''} 
            onChange={(e: ChangeEvent<HTMLInputElement>) =>  
              setExpense({
                bePaid: expense?.bePaid ?? false,
                date: expense?.date ?? 0,
                description: e.target.value,
                value: expense?.value ?? 0,
                id: expense?.id
              })}/>      
          
          <InputCommon
              classNameContainer={style.inputTamanho}            
              classNameContainerInput={style.inputTamanho}
              title='Valor' 
              value={expense?.value ?? 0} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setExpense({
                  bePaid: expense?.bePaid ?? false,
                  date: expense?.date ?? 0,
                  description: expense?.description ?? '',
                  value: Number(e.target.value),
                  id: expense?.id
                })}/>

          <CheckBoxCommon 
            title='Pago' 
            checked={expense?.bePaid ?? false}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => {
                setExpense({
                  bePaid: e.target.checked,
                  date: expense?.date ?? 0,
                  description: expense?.description ?? '',
                  value: expense?.value ?? 0,
                  id: expense?.id
                })
              }
              }/>

          <button type='submit' className={style.button}>Gravar</button>

          <ListExpense />  
        </div>          
        
      </form>            
  )
}