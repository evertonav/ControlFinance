import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../Utils/Date/GetDateToNumber"
import { GetUserLogado } from "../../Services/Login/Logar"
import { EntityExpense } from "../../Services/Expense/EntityExpense"
import { useExpense } from "../../Hooks/useExpense"

export default function UseCadExpense() {
    const { 
      expense, 
      update, 
      setExpense, 
      add,
      deletar
  } = useExpense()

    const queryClient = useQueryClient()

    const expenseAddOrUpdateMutation = useMutation({
      mutationFn: async () => {         
        if (expense?.id) {      
          await update()      
        } 
        else {    
          add()      
        }
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

    function Save() {      
      expenseAddOrUpdateMutation.mutate()
    }

    function ExecuteDelete(id: string) {
      deleteExpenseMutation.mutate({id})
    }

    function setDate(value?: Date) {
      let expenseInternal: EntityExpense;

      if (!expense) {
        return
      }

      expenseInternal = { ...expense }      
      expenseInternal.date = value?.valueOf() ?? new Date().valueOf()

      setExpense(expenseInternal)
    }

    function setDescription(value: string) {
      let expenseInternal: EntityExpense;

      if (!expense) {
        return
      }

      expenseInternal =  { ...expense }
      expenseInternal.description = value
      
      setExpense(expenseInternal)
    }

    function setValue(value?: number) {
      let expenseInternal: EntityExpense;

      if (!expense) {
        return
      }

      expenseInternal = { ...expense }
      expenseInternal.value = value?.toString() ?? ''
      
      setExpense(expenseInternal)       
    }

    function setBePaid(value: boolean) {
      let expenseInternal: EntityExpense;

      if (!expense) {
        return
      }

      expenseInternal = { ...expense }
      expenseInternal.bePaid = value

      setExpense(expenseInternal)
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