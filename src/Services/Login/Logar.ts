import { signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "../FirebaseConnection"

export function Logar(user: string, password: string) : Promise<UserCredential> {           
    return signInWithEmailAndPassword(auth, user, password)                 
}

export function GetUserLogado() : string {
    return JSON.parse(localStorage.getItem('@reactControlFinance') ?? '{}').email
}