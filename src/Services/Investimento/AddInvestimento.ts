import { addDoc, collection, DocumentData, DocumentReference } from "firebase/firestore";
import { db } from "../FirebaseConnection";
import { AddInvestimentoRequest } from "./types";

export async function AddInvestimento(investimento: AddInvestimentoRequest) : Promise<DocumentReference<DocumentData, DocumentData>> {    

    return addDoc(collection(db, "investimentos"), { 
        idCorretora: investimento.idCorretora ?? null,
        title: investimento.title,
        value: investimento.value,
        dateFim: investimento.dateFim,
        periodicidade: investimento.periodicidade,
        user: investimento.user
    })
}
