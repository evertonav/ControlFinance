import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConnection";
import { EntityExpense } from "./EntityExpense";

export async function AddExpense(expense: EntityExpense) {
    await addDoc(collection(db, "expenses"), { 
        bePaid: expense.bePaid,
        date: expense.date,
        description: expense.description,
        value: expense.value,
        user: expense.user
     })
}

export async function AddExpenses(expenses: Array<EntityExpense>) {
    for (const expense of expenses) {    
        await AddExpense(expense)
    }  
}