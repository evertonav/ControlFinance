import { GetUserLogado } from "../../Services/Login/Logar"
import { EntityExpense } from "../../Services/Expense/EntityExpense"
import { setExpenseForField } from "./Functions/SetExpenserForField"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../Utils/Date/GetDateToNumber"
import { useExpense } from "../../Hooks/ExpenseHook"

export default function UseCadExpense() {
    const { 
      expense, 
      update, 
      setExpense, 
      add,
      deletar,
      copy      
  } = useExpense()        

    function Save() {        
      if (expense?.id) {      
        return update.mutateAsync({expense: expense, user: GetUserLogado()})      
      } 
      else {    
        return add.mutateAsync({expense: expense, user: GetUserLogado()})
      }
    }

    function ExecuteDeleteAsync(id: string) {
      return deletar.mutateAsync({id})
    }

    function CopyAsync(dateFrom: Date, dateTo: Date) {      
      return copy.mutateAsync({
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
        CopyAsync,
        ExecuteDeleteAsync,
        setExpense,   

    }
}