import style from './ListExpense.module.css'
import { ConverterDataParaPadraoVisual } from "../../../Utils/Date/ConvertDate"
import ShowIcon from "../../../Components/ShowIcon/ShowIcon"
import UseCadExpense from "../UseCadExpense"
import useListExpense from "./UseListExpense"
import { Dispatch, SetStateAction, useState } from 'react'
import { TabsCadastroExpenseEnum } from '../Enum/TabsCadastroExpense'
import { FilterExpense } from './Actions/FilterExpense'
import { CopyExpense } from './Actions/CopyExpense'
import { ButtonArredondado } from '../../../Components/Button/ButtonArredondado'
import { ShowIconBlue } from '../../../Components/ShowIcon/ShowIconBlue'
import { ContainerModalFullScreen } from '../../../Containers/Container/ContainerModalFullScreen'
import { GetFirstDayMonthNow, GetLastDayMonthNow } from '../../../Utils/Date/GetDateToNumber'

interface ListExpenseProps {
    setAba: Dispatch<SetStateAction<string>>
}

export default function ListExpense({ setAba } : ListExpenseProps) {   
    const [openCopy, setOpenCopy] = useState(false)
    const [openFilterExpense, setOpenFilterExpense] = useState(false)
    const [dateInitialFilter, setDateInitialFilter] = useState<Date>(GetFirstDayMonthNow())
    const [dateFinishFilter, setDateFinishFilter] = useState<Date>(GetLastDayMonthNow())

    let totalExpense = 0

    const {
        listExpense,     
        UpdateList   
    } = useListExpense()

    const { 
        ExecuteDelete,        
        setExpense,
        Copy
     } = UseCadExpense()    

    function handlerOnClickDeleteExpense(id: string) {
        ExecuteDelete(id)       
    }        
    
    return (
        <div>     
            
            <div className={style.containerCabecalho}>    
                <>
                    <ButtonArredondado onClick={() => {
                        setOpenCopy(true)
                    }} >
                        <ShowIconBlue nameIcon='move_group'/>
                    </ButtonArredondado>
                    
                    <ContainerModalFullScreen open={openCopy}>
                        <CopyExpense onAply={(dateFrom, dateTo) => {                            
                            Copy(dateFrom, dateTo)
                            setOpenCopy(false)
                        }}
                        onCancel={() => setOpenCopy(false)}/>
                    </ContainerModalFullScreen>                    
                </>
                
                <>
                    <ButtonArredondado onClick={() => setOpenFilterExpense(true)}>
                        <ShowIconBlue nameIcon='filter_alt' className={style.colorIconSearch}/>
                    </ButtonArredondado>
                    
                    <ContainerModalFullScreen open={openFilterExpense}>
                        <FilterExpense
                        dateInitialFilter={dateInitialFilter}
                        dateFinishFilter={dateFinishFilter}
                        onAply={(dateInicial, dateFinish) => {              
                            UpdateList(dateInicial, dateFinish)

                            dateInicial && setDateInitialFilter(dateInicial)
                            dateFinish && setDateFinishFilter(dateFinish)

                            setOpenFilterExpense(false)
                        }}
                        onCancel={() => setOpenFilterExpense(false)}/>      
                    </ContainerModalFullScreen>                    
                </>                
            </div>
                                       
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

        </div>
        

    )
}