import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../FirebaseConnection"
import { EntityInvestimento } from "./types";

export async function GetInvestimento(user: string) : Promise<Array<EntityInvestimento>> {

    const expensesRef = collection(db, "investimentos")
    const queryRef = query(expensesRef, where('user', '==', user))    
    const querySnapshot = await getDocs(queryRef);            
         
    return querySnapshot.docs.map(item => {               
        return {
            id: item.id,
            ...item.data() as EntityInvestimento
        }
    })   
}