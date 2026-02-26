import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../FirebaseConnection"
import { nameTable } from "./@Types"

export function DeleteInvestimento(id: string) : Promise<void> {
    const docRef = doc(db, nameTable, id) 

    return deleteDoc(docRef) 
}