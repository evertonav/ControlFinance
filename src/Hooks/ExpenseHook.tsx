import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EntityExpense } from "../Services/Expense/EntityExpense"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../Services/FirebaseConnection"
import toast from "react-hot-toast"
import { UserException } from "../Exceptions/UserException"
import { AddExpense, AddExpenses } from "../Services/Expense/AddExpense"
import { GetExpenses } from "../Services/Expense/GetExpenses"
import { GetUserLogado } from "../Services/Login/Logar"
import { GetExpenseCadKey } from "../QueryKey/ExpenseKey"

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

    const { data: expense } = useQuery({
        queryKey: GetExpenseCadKey(),
        queryFn: async () => {
            const expense = queryClient.getQueryData<EntityExpense>(GetExpenseCadKey())

            if (!expense) {
                return GetExpenseDefault()
            }
            
            return expense
        },           
        staleTime: Infinity
    })

    function setExpense(expense: EntityExpense) {        
        queryClient.setQueryData(GetExpenseCadKey(), expense)
    }

    const expenseCopy = useMutation(
        {
            mutationFn: async (data: {dateFirst: Date, dateLast: Date, dateToCopy: Date}) => {
                const expenses: Array<EntityExpense> = await GetExpenses(data.dateFirst, data.dateLast, GetUserLogado())

                const expenseCopy: Array<EntityExpense> = expenses.map((item) => {
                    const { date, ...restItem } = item
                    return {
                        date: data.dateToCopy.valueOf(),                        
                        ...restItem
                    }
                })

                return await AddExpenses(expenseCopy)
            },
            onSuccess: () => {
                toast.success('Registros copiados com sucesso!')  
            },
            onError: (error) => {
                toast.error('Não foi possível deletar o registro. Detalhe: ' + error)
                console.log('Erro: ', error)                  
            }
        }
    )

    const expenseDelete = useMutation({
        mutationFn: async (data: { id: string }) => {
            const docRef = doc(db, "expenses", data.id) 

            await deleteDoc(docRef) 
            return data.id
        },
        onSuccess: (id: string) => {
            if (expense?.id === id) {
                setExpense(GetExpenseDefault())
            }
    
            toast.success('Deletado com sucesso!')  
        },
        onError: (error) => {
            toast.error('Não foi possível deletar o registro. Erro descrito no log!')
            console.log('Erro: ', error)
        }        
      })    

    const expenseAdd = useMutation({
        mutationFn: async (data: { expense?: EntityExpense, user: string }) => {

            if(data.expense === undefined) {
                toast.error('Você preecisa preencher os dados corretamente.')
                throw new UserException('Você preecisa preencher os dados corretamente.')
            }     
            
            if (data.user === '') {
                toast.error('Você precisa estar logado no sistema, faça login novamente!')
                throw new UserException('Você preecisa preencher os dados corretamente.')
            }

            await AddExpense({
                bePaid: data.expense.bePaid,
                date: data.expense.date,
                description: data.expense.description,
                value: data.expense.value,
                user: data.user
            })            
        },
        onSuccess: () => {
            toast.success('Registro salvo com sucesso!')

            setExpense(GetExpenseDefault())
        },
        onError: (error) => {
            if (!(error instanceof UserException)) {
                toast.error(`Erro ao cadastrar no banco: ${error}`)
            }            
        }
    })   
    
    const expenseUpdate = useMutation({
        mutationFn: async (data: {expense?: EntityExpense, user: string} ) => {           

            if (data.expense === undefined) {
                toast.error('Voce precisa preencher o "expense"')
                throw new UserException('Voce precisa preencher o "expense"')
            }

            if (data.expense.id === undefined) {
                toast.error('O id do expense deve estar preenchido!')
                throw new UserException('O id do expense deve estar preenchido!')
            }

            if (data.user === '') {
                toast.error('Você precisa estar logado no sistema, faça login novamente!')
                throw new UserException('Você precisa estar logado no sistema, faça login novamente!')
            }

            const userRef = doc(db, 'expenses', data.expense.id ?? ''); 

            await updateDoc(userRef, {
                bePaid: data.expense.bePaid,
                date: data.expense.date,
                description: data.expense.description,
                value: data.expense.value,            
                user: data.user
            });
        },
        onSuccess: () => {            
            toast.success('Atualizado com sucesso!')
            setExpense(GetExpenseDefault())
        },
        onError: (error) => {
            if (!(error instanceof UserException)) {
                toast.error('erro: ' + error)
                console.error('Erro ao atualizar o documento: ', error);    
            }                
        }
    })    

    return {
        expense, 
        setExpense, 
        add: expenseAdd,
        update: expenseUpdate,
        deletar: expenseDelete,
        copy: expenseCopy
    }
}