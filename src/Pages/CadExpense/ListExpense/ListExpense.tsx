import style from './ListExpense.module.css'
import { ConverterDataParaPadraoVisual } from "../../../Utils/Date/ConvertDate"
import ShowIcon from "../../../Components/ShowIcon/ShowIcon"
import UseCadExpense from "../CadExpenseHook"
import { useListExpenseReturn } from "./ListExpenseHook"
import { Dispatch, SetStateAction, useRef } from 'react'
import { TabsCadastroExpenseEnum } from '../Enum/TabsCadastroExpense'
import { FilterExpense } from './Actions/FilterExpense'
import { CopyExpense } from './Actions/CopyExpense'
import { ButtonArredondado } from '../../../Components/Button/ButtonArredondado'
import { ShowIconBlue } from '../../../Components/ShowIcon/ShowIconBlue'
import { ContainerModalElement, ContainerModalFullScreen } from '../../../Containers/Container/ContainerModalFullScreen'
import { EntityExpense } from '../../../Services/Expense/EntityExpense'

interface ListExpenseProps {
    setAba: Dispatch<SetStateAction<string>>
    listExpenseHook: useListExpenseReturn
}

export default function ListExpense({ setAba, listExpenseHook } : ListExpenseProps) {        
    const modalCopyRef = useRef<ContainerModalElement>(null) 
    const modalFilterRef = useRef<ContainerModalElement>(null)

    const {
        dayInitial,
        dayFinish,
        setDayFinish,
        setDayInitial,
        listExpense,   
        UpdateList          
    } = listExpenseHook

    const { 
        ExecuteDeleteAsync,        
        setExpense,
        CopyAsync
     } = UseCadExpense()    

    let totalExpense = 0

    function handlerOnClickDeleteExpense(id: string) {
        ExecuteDeleteAsync(id).then(() => UpdateList())
    }        
    
    return (
        <div>     
            
            <div className={style.containerCabecalho}>    
                <>
                    <ButtonArredondado onClick={() => {
                        modalCopyRef.current?.open()
                    }} >
                        <ShowIconBlue nameIcon='move_group'/>
                    </ButtonArredondado>
                    
                    <ContainerModalFullScreen ref={modalCopyRef}>
                        <CopyExpense onAply={(dateFrom, dateTo) => {                            
                            CopyAsync(dateFrom, dateTo).then(() => UpdateList())
                            modalCopyRef.current?.close()
                        }}
                        onCancel={() => modalCopyRef.current?.close()}/>
                    </ContainerModalFullScreen>                    
                </>
                
                <>
                    <ButtonArredondado onClick={() => modalFilterRef.current?.open()}>
                        <ShowIconBlue nameIcon='filter_alt' className={style.colorIconSearch}/>
                    </ButtonArredondado>
                    
                    <ContainerModalFullScreen ref={modalFilterRef}>
                        <FilterExpense
                            dateInitialFilter={dayInitial}
                            dateFinishFilter={dayFinish}
                            onAply={(dateInicial, dateFinish) => {                                             
                                dateInicial && setDayInitial(dateInicial)
                                dateFinish && setDayFinish(dateFinish)

                                modalFilterRef.current?.close()
                            }}
                            onCancel={() => modalFilterRef.current?.close()}/>      
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
                        listExpense?.map((item: EntityExpense, i: number) => {
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