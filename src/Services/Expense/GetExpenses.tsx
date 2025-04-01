import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../FirebaseConnection"
import { EntityExpense } from "./EntityExpense"

export async function GetExpenses(
    dateFirst: Date,
    dateLast: Date,
    user: string) : Promise<Array<EntityExpense>> {

    const expensesRef = collection(db, "expenses")
    const queryRef = query(expensesRef,
                           where('date', '>=', dateFirst.valueOf()),
                           where('date', '<', dateLast.valueOf()),
                           where('user', '==', user))
    
    const querySnapshot = await getDocs(queryRef);

    let expenses: Array<EntityExpense> = []
    
    querySnapshot.forEach((doc) => {
        expenses.push(
            {
                id: doc.id,
                bePaid: doc.data().bePaid,
                date: doc.data().date,
                description: doc.data().description,
                value: doc.data().value,                
                user: doc.data().user
            }
        )
      });        
    return expenses   
}