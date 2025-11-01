import { GetExpenses } from "../../../Services/Expense/GetExpenses";
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../Utils/Date/GetDateToNumber";
import { GetUserLogado } from "../../../Services/Login/Logar";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetListExpenseKey } from "../../../QueryKey/ExpenseKey";

export default function useListExpense() {

    const firstDayMonthNow = GetFirstDayMonthNow()
    const lastDayMonthNow = GetLastDayMonthNow()
    const userLogado = GetUserLogado()
    const queryClient = useQueryClient()    

    const { data: listExpense, isError } = useQuery({
        queryKey: GetListExpenseKey(),
        queryFn: async () => {                         
            return GetExpenses(firstDayMonthNow, lastDayMonthNow, userLogado)   
        },                                                  
    });

    function UpdateList(dayInitial?: Date, dayFinish?: Date) {          
        queryClient.fetchQuery({
            queryKey: GetListExpenseKey(),
            queryFn: async () => GetExpenses(dayInitial ?? firstDayMonthNow, 
                                             dayFinish ?? lastDayMonthNow, 
                                             userLogado),
          });
    }

    if (isError) {
        toast.error('Não foi possivel buscar os dados, verifique o log.')                                
    }    
                      
    return {
        listExpense,        
        UpdateList
    }
}