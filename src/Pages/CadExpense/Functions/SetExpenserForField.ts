import { EntityExpense } from "../../../Services/Expense/EntityExpense";

type FieldsString = 'id' | 'description' | 'value' | 'user'    

export function setExpenseForField(
    setExpense: (expense: EntityExpense) => void, 
    field: FieldsString, 
    value: string,
    expense?: EntityExpense) 
{

    let expenseInternal: EntityExpense;
    
    if (!expense) {
        return
    }
    
    expenseInternal = { ...expense }      
    expenseInternal[field] = value
    
    setExpense(expenseInternal)
}