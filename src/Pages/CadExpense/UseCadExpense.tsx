import { useQueryClient } from "@tanstack/react-query"
import { GetUserLogado } from "../../Services/Login/Logar"
import { EntityExpense } from "../../Services/Expense/EntityExpense"
import { useExpense } from "../../Hooks/useExpense"
import { setExpenseForField } from "./Functions/SetExpenserForField"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../Utils/Date/GetDateToNumber"
import { GetListExpenseKey } from "../../QueryKey/ExpenseKey"

export default function UseCadExpense() {
    const { 
      expense, 
      update, 
      setExpense, 
      add,
      deletar,
      copy      
  } = useExpense()

    const queryClient = useQueryClient()

    if (deletar.isSuccess || add.isSuccess || update.isSuccess || copy.isSuccess) {
      queryClient.invalidateQueries({queryKey: GetListExpenseKey()})  
    }      

    function Save() {      
      if (expense?.id) {      
        update.mutate({expense: expense, user: GetUserLogado()})      
      } 
      else {    
        add.mutate({expense: expense, user: GetUserLogado()})
      }
    }

    function ExecuteDelete(id: string) {
      deletar.mutate( {id})
    }

    function Copy(dateFrom: Date, dateTo: Date) {      
      copy.mutate({
        dateFirst: GetFirstDayMonthNow(dateFrom),
        dateLast: GetLastDayMonthNow(dateFrom),
        dateToCopy: dateTo
      })
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
      setExpenseForField(setExpense, "description", value, expense);
    }

    function setValue(value?: number) {
      setExpenseForField(setExpense, "value", value?.toString() ?? '', expense)
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
        Copy,
        ExecuteDelete,
        setExpense,   

    }
}