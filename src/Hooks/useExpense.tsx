import { useQuery, useQueryClient } from "@tanstack/react-query"
import { EntityExpense } from "../Services/Expense/EntityExpense"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../Services/FirebaseConnection"
import toast from "react-hot-toast"
import { GetUserLogado } from "../Services/Login/Logar"

export function GetExpenseDefault(): EntityExpense {
    return {
        bePaid: false,
        date: new Date().valueOf(),
        description: '',
        value: ''
    }
}

export function useExpense() {
    const queryClient = useQueryClient()
    const queryKey = ['expenseCadastro']

    const { data: expense } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const expense = queryClient.getQueryData<EntityExpense>(queryKey)

            if (!expense) {
                return GetExpenseDefault()
            }
            
            return expense
        },           
        staleTime: Infinity
    })

    function setExpense(expense: EntityExpense) {        
        queryClient.setQueryData(queryKey, expense)
    }
    
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
                date: expense.date,
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

    return {
        expense, 
        setExpense, 
        add,
        update,
        deletar
    }
}