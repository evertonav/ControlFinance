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
                onChange={(newValue) =>  setExpense((expense) => {

                  if (!expense) {
                    return expense
                  }

                  const newExpense = { ...expense }

                  newExpense.date = newValue?.toDate().valueOf() ?? new Date().valueOf()
                  return newExpense                  
                })}
              />
            
          </LocalizationProvider>

          <InputCommon 
            classNameContainer={style.inputTamanho}            
            classNameContainerInput={style.inputTamanho}
            className={style.colorBlack}
            title='Descrição' 
            value={expense?.description ?? ''} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setExpense((expense) => {

              if (!expense) {
                return expense
              }

              const newExpense = { ...expense }

              newExpense.description = e.target.value
              return newExpense                  
            })}/>      
          
          <InputCommon
              classNameContainer={style.inputTamanho}            
              classNameContainerInput={style.inputTamanho}
              className={style.colorBlack}
              title='Valor' 
              value={expense?.value ?? 0} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setExpense((expense) => {

                if (!expense) {
                  return expense
                }

                const newExpense = { ...expense }

                newExpense.value = Number(e.target.value)
                return newExpense                  
              })}/>

          <CheckBoxCommon 
            title='Pago' 
            checked={expense?.bePaid ?? false}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => {
                setExpense((expense) => {

                  if (!expense) {
                    return expense
                  }
  
                  const newExpense = { ...expense }
  
                  newExpense.bePaid = e.target.checked
                  return newExpense                  
                })}
              }/>

          <button type='submit' className={style.button}>Gravar</button>

          <ListExpense />  
        </div>          
        
      </form>            
  )
}