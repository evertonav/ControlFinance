import { GetExpenses } from "../../../Services/Expense/GetExpenses";
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../Utils/Date/GetDateToNumber";
import { GetUserLogado } from "../../../Services/Login/Logar";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetListExpenseKey } from "../../../QueryKey/ExpenseKey";
import { useState } from "react";
import { EntityExpense } from "../../../Services/Expense/EntityExpense";

export interface useListExpenseReturn 
{
    dayInitial: Date;
    setDayInitial: (value: Date) => void;
    dayFinish: Date;
    setDayFinish: (value: Date) => void;
    listExpense?: Array<EntityExpense>
    UpdateList: (dayInitial?: Date, dayFinish?: Date) => void;
}

export default function useListExpense() : useListExpenseReturn  {
        
    const [dayInitial, setDayInitial] = useState(GetFirstDayMonthNow())
    const [dayFinish, setDayFinish] = useState(GetLastDayMonthNow())
    const userLogado = GetUserLogado()
    const queryClient = useQueryClient()   
    
    function GetParametersQuery(dayInitialParameter: Date, dayFinishParameter: Date) {
        return {
            queryKey: GetListExpenseKey(dayInitialParameter.valueOf(), dayFinishParameter.valueOf()),
            queryFn: async () => {                         
                return GetExpenses(dayInitialParameter, dayFinishParameter, userLogado)   
            }
        }                                                 
    } 

    const { data: listExpense, isError } = useQuery(GetParametersQuery(dayInitial, dayFinish));

    function UpdateList(dayInitialUpdate?: Date, dayFinishUpdate?: Date) { 
        const dayInitialInternal = dayInitialUpdate ?? dayInitial
        const dayFinishInternal = dayFinishUpdate ?? dayFinish
        
        queryClient.fetchQuery(GetParametersQuery(dayInitialInternal, dayFinishInternal));
    }

    if (isError) {
        toast.error('Não foi possivel buscar os dados, verifique o log.')                                
    }    
                      
    return {
        dayInitial,
        setDayInitial,
        dayFinish,
        setDayFinish,
        listExpense,        
        UpdateList
    }
}