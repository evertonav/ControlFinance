import {  FormEvent, useState } from 'react'
import InputCommon from '../../components/Input/InputCommon'
import style from './CadExpense.module.css'
import CheckBoxCommon from '../../components/CheckBox/CheckBoxCommon'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Services/FirebaseConnection'
import ListExpense from '../ListExpense/ListExpense'

export default function CadExpense() {
  const [data, setData] = useState<Dayjs | null>(dayjs('2025-03-26'));
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [bePaid, setBePaid] = useState(false) 


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    console.log('Rodou o submit');

    addDoc(collection(db, "expenses"), {
      data: data?.toDate().valueOf(),
      description: description,
      value: value,
      bePaid: bePaid
    }).then(() => {
      console.log('Deu certo')
    }).catch((error) => {
      console.log('Erro ao cadastrar no banco: ', error)
    })
  };

  return (
    <div className={style.container}>
      <form className={style.containerHalf} onSubmit={handleSubmit}>      
        <div className={style.containerHalf}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>          
              <DatePicker
                label="Data"
                value={data}
                onChange={(newValue) => setData(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <InputCommon 
            classNameContainer={style.inputTamanho}            
            classNameContainerInput={style.inputTamanho}
            title='Descrição' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}/>      
          
          <InputCommon 
              classNameContainer={style.inputTamanho}            
              classNameContainerInput={style.inputTamanho}
              title='Valor' 
              value={value} 
              onChange={(e) => setValue(Number(e.target.value))}/>

          <CheckBoxCommon title='Pago' checked={bePaid} onChange={(e) => setBePaid(e.target.checked)}/>
        </div>     

        <div className={style.containerButton}>
          <button type='submit' className={style.button}>Gravar</button>
        </div> 

        <ListExpense />   
      </form>        
    </div>
  )
}