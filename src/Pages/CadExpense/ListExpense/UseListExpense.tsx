import { GetExpenses } from "../../../Services/Expense/GetExpenses";
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../Utils/Date/GetDateToNumber";
import { GetUserLogado } from "../../../Services/Login/Logar";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function useListExpense() {
    const firstDayMonthNow = GetFirstDayMonthNow()
    const lastDayMonthNow =  GetLastDayMonthNow()
    const userLogado = GetUserLogado()

    const { data: listExpense, isError, refetch } = useQuery({
        queryKey: ['listExpense', firstDayMonthNow, lastDayMonthNow, userLogado],
        queryFn: async () => GetExpenses(firstDayMonthNow, lastDayMonthNow, userLogado)                                      
    });

    if (isError) {
        toast.error('Não foi possivel buscar os dados, verifique o log.')                                
    }
                         
    return {
        listExpense,        
        UpdateList: refetch
    }
}