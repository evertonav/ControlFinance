import { GetUserLogado } from "../Services/Login/Logar";

export function GetListExpenseKey(dayInitial: number = 0, dayFinish: number = 0) {
    return ['listExpense', GetUserLogado(), dayInitial, dayFinish]
}

export function GetExpenseCadKey() {
    return ['expenseCadastro']
}