import { useContext, useEffect, useState } from "react"
import style from './ListExpense.module.css'
import { EntityExpense } from "../../Services/Expense/EntityExpense"
import { ExpenseContext } from "../../Contexts/CRUDExpense"
import { GetUserLogado } from "../../Services/Login/Logar"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../Utils/Date/GetDateToNumber"
import { ConverterDataParaPadraoVisual } from "../../Utils/Date/ConvertDate"
import { GetExpenses } from "../../Services/Expense/GetExpenses"
import toast from "react-hot-toast"
import ShowIcon from "../../Components/ShowIcon/ShowIcon"

export default function ListExpense() {
    const [listExpense, setListExpense] = useState<Array<EntityExpense>>([])
    let totalExpense = 0
    const { setExpense, deletar } = useContext(ExpenseContext)    

    async function handlerOnClickDeleteExpense(id: string) {
        deletar(id) 
        setListExpense([])       
    }
    
    useEffect(() => {        
        GetExpenses(GetFirstDayMonthNow(), GetLastDayMonthNow(), GetUserLogado())
            .then((expenses) => {
                setListExpense(expenses)
            }).catch((error) => {
                toast.error('Não foi possivel buscar os dados, verifique o log.')
                console.log('GetExpenses: ', error)
            })        
          }, [GetUserLogado(), listExpense])

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
                    listExpense.map((item, i) => {
                        totalExpense = totalExpense + item.value

                        return (
                            <tr key={i} className={style.tr}>
                            <td key={i + 2} className={style.tdLabel} data-label='Pago'>{item.bePaid ? 'Sim' : 'Não'}</td>
                            <td key={i + 3} className={style.tdLabel} data-label='Data despesa'>{ConverterDataParaPadraoVisual(new Date(item.date))}</td>                                
                            <td key={i + 4} className={style.tdLabel} data-label='Descrição'>{item.description}</td>
                            <td key={i + 5} className={style.tdLabel} data-label='Valor'>{item.value}</td>                                    
                            <td key={i + 6} className={style.tdLabel} data-label=''>
                                <ShowIcon nameIcon="edit_square" onClick={() => {
                                    setExpense(item)                                        
                                }}/> 
                            </td>  
                            <td key={i + 7} className={style.tdLabel} data-label=''>
                                <ShowIcon 
                                    nameIcon="delete"
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