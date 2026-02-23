import { addDoc, collection, DocumentData, DocumentReference } from "firebase/firestore";
import { db } from "../FirebaseConnection";
import { EntityInvestimento } from "./types";

export async function AddInvestimento(investimento: EntityInvestimento) : Promise<DocumentReference<DocumentData, DocumentData>> {
    const { idCorretora, ...rest } = investimento

    return addDoc(collection(db, "investimentos"), { 
        idCorretora: idCorretora ?? null,
        rest
    })
}
