import { useContext } from "react"
import { ExpenseContext } from "../../Contexts/CRUDExpense"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../Utils/Date/GetDateToNumber"
import { GetUserLogado } from "../../Services/Login/Logar"

export default function UseCadExpense() {
    const { 
        expense, 
        update, 
        setExpense, 
        add,
        deletar
    } = useContext(ExpenseContext)

    const queryClient = useQueryClient()

    const expenseAddOrUpdateMutation = useMutation({
      mutationFn: async () => { 
        return SaveInterno() 
      },

      onSuccess: () => {
               
        queryClient.invalidateQueries({queryKey: ['listExpense',
                                                  GetFirstDayMonthNow(), 
                                                  GetLastDayMonthNow(), 
                                                  GetUserLogado()]
                                      })  
      }  
    })

    const deleteExpenseMutation = useMutation({
      mutationFn: async (data: { id: string }) => {
        return deletar(data.id)
      }, 
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['listExpense',
                                                  GetFirstDayMonthNow(), 
                                                  GetLastDayMonthNow(), 
                                                  GetUserLogado()]
                                       })  
      }
    })

    async function SaveInterno() {
        if (expense?.id) {      
            await update()      
          } 
          else {    
            add()      
          }
    }

    function Save() {
      expenseAddOrUpdateMutation.mutate()
    }

    function ExecuteDelete(id: string) {
      deleteExpenseMutation.mutate({id})
    }

    function setDate(value?: Date) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.date = value?.valueOf() ?? new Date().valueOf()
            return newExpense                  
          })
    }

    function setDescription(value: string) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.description = value
            return newExpense                  
          })
    }

    function setValue(value?: number) {
        setExpense((expense) => {
        
            if (!expense) {
                return expense
            }
        
            const newExpense = { ...expense }
        
            newExpense.value = value?.toString() ?? ''
            return newExpense                  
        })
    }

    function setBePaid(value: boolean) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.bePaid = value
            return newExpense                  
          })
    }

    return {
        Save,
        setDate,
        setValue,
        setDescription,
        setBePaid,
        expense,    
        ExecuteDelete,
        setExpense,   

    }
}