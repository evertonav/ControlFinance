import {  ChangeEvent, FormEvent, useState } from 'react'
import style from './CadExpense.module.css'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Services/FirebaseConnection'
import ListExpense, { EntityExpense } from '../../Features/ListExpense/ListExpense'
import InputCommon from '../../Components/Input/InputCommon'
import CheckBoxCommon from '../../Components/CheckBoxCommon';
import toast from 'react-hot-toast';

export default function CadExpense() {
  const [data, setData] = useState<Dayjs | null>(dayjs('2025-03-26'));
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [bePaid, setBePaid] = useState(false) 
  const [inserir, setInserir] = useState(true)
  const [idAtualizar, setIdAtualizar] = useState('')
  const [documentoAtualizar, setDocumentoAtualizar] = useState<EntityExpense>()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();    
    if (inserir) {
      addDoc(collection(db, "expenses"), {
        data: data?.toDate().valueOf(),
        description: description,
        value: value,
        bePaid: bePaid
      }).then(() => {
        toast.success('Registro salvo com sucesso!')
      }).catch((error) => {
        toast.error('Erro ao cadastrar no banco: ', error)
      })
    } else {
      updateDocument(idAtualizar)
    }
  };

  const updateDocument = async (userId: string) => {
    try {
      // Referência ao documento
      toast.success('entrou no update')
      const userRef = doc(db, 'expenses', userId);
  
      // Atualizar o documento
      await updateDoc(userRef, {
          bePaid: bePaid,
          data: data?.toDate().valueOf(),
          description: description,
          value: value
      });
      console.log('Documento atualizado com sucesso!');
    } catch (error) {
      toast.success('erro' + error)
      console.error('Erro ao atualizar o documento: ', error);
    }
  };

  return (
  
      <form className={style.containerForm} onSubmit={handleSubmit}>      
        <div className={style.containerFields}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
              <DatePicker
                label="Data"
                value={data}
                onChange={(newValue) => setData(newValue)}
              />
            
          </LocalizationProvider>

          <InputCommon 
            classNameContainer={style.inputTamanho}            
            classNameContainerInput={style.inputTamanho}
            title='Descrição' 
            value={description} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>      
          
          <InputCommon
              classNameContainer={style.inputTamanho}            
              classNameContainerInput={style.inputTamanho}
              title='Valor' 
              value={value} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}/>

          <CheckBoxCommon title='Pago' checked={bePaid} onChange={(e: ChangeEvent<HTMLInputElement>) => setBePaid(e.target.checked)}/>

          <button type='submit' className={style.button}>Gravar</button>

          <ListExpense setIdAtualizar={setIdAtualizar} setInserir={setInserir} />  
        </div>          
        
      </form>            
  )
}