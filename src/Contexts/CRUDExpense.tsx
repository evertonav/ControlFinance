import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { EntityExpense } from "../Services/Expense/EntityExpense";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/FirebaseConnection";
import toast from "react-hot-toast";
import { GetUserLogado } from "../Services/Login/Logar";

interface ExpenseProviderProps {
    children: ReactNode
}

interface ExpenseContextData {
    expense?: EntityExpense
    setExpense: Dispatch<SetStateAction<EntityExpense>>
    add: () => boolean
    update: () => Promise<boolean>
    deletar: (id: string) => Promise<boolean>
}

export const ExpenseContext = createContext({} as ExpenseContextData)

function GetExpenseDefault(): EntityExpense {
    return {
        bePaid: false,
        date: new Date().valueOf(),
        description: '',
        value: ''
    }
}

function ExpenseProvider({ children } : ExpenseProviderProps){
    const [expense, setExpense] = useState<EntityExpense>(GetExpenseDefault()) 
    
    async function deletar(id: string) : Promise<boolean> {    
        const docRef = doc(db, "expenses", id)   

        return await deleteDoc(docRef)
                        .then(() => {
                            if (expense?.id === id) {
                                setExpense(GetExpenseDefault())
                            }
                    
                            toast.success('Deletado com sucesso!')  

                            return true
                        }).catch((error) => {
                            toast.error('Não foi possível deletar o registro. Erro descrito no log!')
                            console.log('Erro: ', error)

                            Promise.reject(error)
                            return false
                        })
        
                
    }        

    async function update() : Promise<boolean> {
        try {
            if (expense === undefined) {
                toast.error('Voce precisa preencher o "expense"')
                return false
            }

            if (expense.id === undefined) {
                toast.error('O id do expense deve estar preenchido!')
                return false
            }

            if (GetUserLogado() === '') {
                toast.error('Você precisa estar logado no sistema, faça login novamente!')
                return false
            }

            const userRef = doc(db, 'expenses', expense.id ?? '');                  
        
            // Atualizar o documento
            await updateDoc(userRef, {
                bePaid: expense.bePaid,
                data: expense.date,
                description: expense.description,
                value: expense.value,            
                user: GetUserLogado()    
            });

            setExpense(GetExpenseDefault())
            toast.success('Atualizado com sucesso!')
                        
          } catch (error) {
            toast.success('erro' + error)
            console.error('Erro ao atualizar o documento: ', error);
            
          }

          return true
    }

    function add() : boolean {
        

        if(expense === undefined) {
            toast.error('Você preecisa preencher os dados corretamente.')
            return false
        }     
        
        if (GetUserLogado() === '') {
            toast.error('Você precisa estar logado no sistema, faça login novamente!')
            return false
        }

        addDoc(collection(db, "expenses"), { 
            bePaid: expense.bePaid,
            date: expense.date,
            description: expense.description,
            value: expense.value,
            user: GetUserLogado()
         })
            .then(() => {
                toast.success('Registro salvo com sucesso!')
                return true
            })
            .catch((error) => {
                toast.error('Erro ao cadastrar no banco: ', error)
                return false
            })

        setExpense(GetExpenseDefault())
        return true
    }    

    return (
        <ExpenseContext.Provider 
            value={
                {
                    expense: expense, 
                    setExpense: setExpense, 
                    add: add,
                    update: update,
                    deletar: deletar
                }
            }>

            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider