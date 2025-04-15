import { LocalizationProvider } from '@mui/x-date-pickers'
import style from './FormCadExpense.module.css'
import {  ChangeEvent, FormEvent } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UseCadExpense from '../UseCadExpense';
import InputCommon from '../../../Components/Input/InputCommon';
import CheckBoxCommon from '../../../Components/CheckBox/CheckBoxCommon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const schema = z.object(
    {
        //date: z.number().gt(0, 'Preencha com uma data válida'),
        description: z.string().nonempty("O campo deve ser preenchido."),
        value: z.string()
                .regex(/^\d+$/, { message: "Somente números são permitidos" }), // Validação para garantir números                
        bePaid: z.boolean()
                 .refine(val => val === true || val === false, {
                    message: "Este campo é obrigatório e deve ser verdadeiro ou falso.",
                 }),
    }
)

type FormData = z.infer<typeof schema>

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
    } = useForm<FormData>(
        {
            resolver: zodResolver(schema),
            mode: "onChange"
        }
    )
      
    
    const handleSubmitForm = async (data: FormData) => {                  
        await Save()
    };  

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
        
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
                    error={errors.description?.message}
                    register={register}
                    name="description"
                    title='Descrição' 
                    value={expense?.description} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>      
                
                <InputCommon
                    classNameContainer={style.inputTamanho}            
                    classNameContainerInput={style.inputTamanho}
                    className={style.colorBlack}
                    error={errors.value?.message}
                    register={register}
                    name="value"
                    title='Valor' 
                    value={expense?.value ?? ''} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}/>

                <CheckBoxCommon 
                    title='Pago' 
                    name='bePaid'
                    error={errors.bePaid?.message}
                    register={register}              
                    checked={expense?.bePaid ?? false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBePaid(e.target.checked)}/>

                <button type='submit' className={style.button}>Gravar</button>                           
            </div>          
        
        </form>      
    )
}