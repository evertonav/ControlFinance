import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { db } from "../../Services/FirebaseConnection"
import style from './ListExpense.module.css'
import toast from "react-hot-toast"

//Commit para atualizar as pastas no git

export interface EntityExpense {
    id: string
    bePaid: boolean
    data: number
    description: string
    value: number
}

function ConverterDataParaPadraoVisual(data: Date) : string {    
    return `${data.getDate().toString().padStart(2, '0')}/${data.getMonth() + 1}/${data.getFullYear()}`
}

function GetFirstDayMonthNow() : number {
    const today = new Date();
    console.log('First: ', today)
    return new Date(today.getFullYear(), today.getMonth(), 1).valueOf()
}

function GetLastDayMonthNow() : number {
    const today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + 1, 1).valueOf();

}

interface ListExpenseProps {
    setInserir: Dispatch<SetStateAction<boolean>>
    setIdAtualizar: Dispatch<SetStateAction<string>>
}

export default function ListExpense({setInserir, setIdAtualizar} : ListExpenseProps) {
    const [listExpense, setListExpense] = useState<Array<EntityExpense>>([])
    let totalExpense = 0

    async function handlerOnClickDeleteExpense(id: string) {
        toast.success(id)
        const docRef = doc(db, "expenses", id)        
        await deleteDoc(docRef)
    }
    
    useEffect(() => {
        const expensesRef = collection(db, "expenses")
        const queryRef = query(expensesRef,
                               where('data', '>', GetFirstDayMonthNow()),
                               where('data', '<', GetLastDayMonthNow()))
      
        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list: Array<EntityExpense> = []
            
            snapshot.forEach((doc) => {
                list.push(
                    {
                        id: doc.id,
                        bePaid: doc.data().bePaid,
                        data: doc.data().data,
                        description: doc.data().description,
                        value: doc.data().value
                    }
                )
                
            })
            console.log('List: ', list)
    
                setListExpense(list)
            })
    
              return () => {
                unsub()
              }
          }, [])

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
                                    <td key={i + 3} className={style.tdLabel} data-label='Data despesa'>{ConverterDataParaPadraoVisual(new Date(item.data))}</td>                                
                                    <td key={i + 4} className={style.tdLabel} data-label='Descrição'>{item.description}</td>
                                    <td key={i + 5} className={style.tdLabel} data-label='Valor'>{item.value}</td>                                    
                                    <td key={i + 5} className={style.tdLabel} data-label='Valor'>
                                    <span className="material-symbols-outlined" onClick={() => {
                                        setInserir(false)
                                        setIdAtualizar(item.id)
                                        setAtualizarDocumento(item)
                                    }}>
edit_square
</span>   
                                    </td>  
                                    <td key={i + 5} className={style.tdLabel} data-label='Valor'>
                                      <span 
                                        className="material-symbols-outlined"
                                        onClick={() => handlerOnClickDeleteExpense(item.id)}>
                                        delete
                                      </span>    
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