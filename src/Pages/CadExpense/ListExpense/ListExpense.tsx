import style from './ListExpense.module.css'
import { ConverterDataParaPadraoVisual } from "../../../Utils/Date/ConvertDate"
import ShowIcon from "../../../Components/ShowIcon/ShowIcon"
import UseCadExpense from "../UseCadExpense"
import useListExpense from "./UseListExpense"
import { Dispatch, SetStateAction } from 'react'
import { TabsCadastroExpenseEnum } from '../Enum/TabsCadastroExpense'

interface ListExpenseProps {
    setAba: Dispatch<SetStateAction<string>>
}

export default function ListExpense({ setAba } : ListExpenseProps) {
    
    let totalExpense = 0

    const {
        listExpense,         
        UpdateList
    } = useListExpense()

    const { 
        ExecuteDelete,
        setExpense
     } = UseCadExpense()    

    async function handlerOnClickDeleteExpense(id: string) {
        await ExecuteDelete(id) && UpdateList()        
    }    

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Pago</th>
                    <th scope="col">Data despesa</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th> 
                    <th scope="col"></th>    
                    <th scope="col"></th>               
                </tr>
            </thead>

            <tbody>
               
                {
                    listExpense?.map((item, i) => {
                        totalExpense = totalExpense + Number(item.value)

                        return (
                            <tr key={i} className={style.tr}>
                            <td key={i + 2} className={style.tdLabel} data-label='Pago'>{item.bePaid ? 'Sim' : 'Não'}</td>
                            <td key={i + 3} className={style.tdLabel} data-label='Data despesa'>{ConverterDataParaPadraoVisual(new Date(item.date))}</td>                                
                            <td key={i + 4} className={style.tdLabel} data-label='Descrição'>{item.description}</td>
                            <td key={i + 5} className={style.tdLabel} data-label='Valor'>{item.value}</td>                                    
                            <td key={i + 6} className={style.tdLabel} data-label=''>
                                <ShowIcon 
                                    nameIcon="edit_square"
                                    className={`${style.colorEdit} ${style.mousePointer}`} 
                                    onClick={() => {
                                        setExpense(item)       
                                        setAba(TabsCadastroExpenseEnum.Cadastro)                                 
                                    }}/> 
                            </td>  
                            <td key={i + 7} className={style.tdLabel} data-label=''>
                                <ShowIcon 
                                    nameIcon="delete"
                                    className={`${style.colorDeletar} ${style.mousePointer}`}
                                    onClick={() => {handlerOnClickDeleteExpense(item.id ?? '')}}/>
                                  
                            </td>                                    
                        </tr>                       
                        )
                    })
                    }
                    <tr className={style.tr}>
                        <td className={style.tdLabel} data-label='Pago'>Total(Valor renda - Total gasto): {4500 - totalExpense} </td>    
                    </tr>
                
            </tbody>
        </table>

    )
}