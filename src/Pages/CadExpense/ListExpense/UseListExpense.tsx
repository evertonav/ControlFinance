import { useEffect, useState } from "react";
import { EntityExpense } from "../../../Services/Expense/EntityExpense";
import { GetExpenses } from "../../../Services/Expense/GetExpenses";
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../Utils/Date/GetDateToNumber";
import { GetUserLogado } from "../../../Services/Login/Logar";
import toast from "react-hot-toast";

export default function useListExpense() {
    const [listExpense, setListExpense] = useState<Array<EntityExpense>>([])

    useEffect(() => {        
        GetExpenses(GetFirstDayMonthNow(), GetLastDayMonthNow(), GetUserLogado())
            .then((expenses) => {
                setListExpense(expenses)
            }).catch((error) => {
                toast.error('Não foi possivel buscar os dados, verifique o log.')
                console.log('GetExpenses: ', error)
            })        
    }, [GetUserLogado(), listExpense])

    return {
        listExpense,
        setListExpense
    }
}