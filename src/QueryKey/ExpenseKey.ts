import { GetUserLogado } from "../Services/Login/Logar";

export function GetListExpenseKey() {
    return ['listExpense', GetUserLogado()]
}

export function GetExpenseCadKey() {
    return ['expenseCadastro']
}