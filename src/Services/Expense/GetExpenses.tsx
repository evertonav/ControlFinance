import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../FirebaseConnection"
import { EntityExpense } from "./EntityExpense"

export function GetExpenses(dateFirst: Date, dateLast: Date) : Array<EntityExpense> {
    const expensesRef = collection(db, "expenses")
    const queryRef = query(expensesRef,
                           where('date', '>', dateFirst.valueOf()),
                           where('date', '<', dateLast.valueOf()))
    
    console.log('inicio: ', dateFirst, ' fim:', dateLast)
    let listExpenses: Array<EntityExpense> = []
      
    const unsub = onSnapshot(queryRef, (snapshot) => {    
            
        snapshot.forEach((doc) => {
            console.log('doc:', doc)
        
            listExpenses.push(
            {
                id: doc.id,
                bePaid: doc.data().bePaid,
                date: doc.data().date,
                description: doc.data().description,
                value: doc.data().value
            })
                
        })
                            
    })

    console.log('get: ', listExpenses)
    
    unsub()
    return listExpenses
}