import { FilterContainer } from "../../../../Containers/FilterContainer/FilterContainer";
import {  Dispatch, SetStateAction, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../../Utils/Date/GetDateToNumber";

interface CopyExpenseProps {
    onAply: (dateFrom: Date, dateTo: Date) => void
    onCancel: () => void
}

export function CopyExpense({onAply, onCancel} : CopyExpenseProps) {    
    const [dateFrom, setDateFrom] = useState<Date>(GetFirstDayMonthNow())
    const [dateTo, setDateTo] = useState<Date>(GetLastDayMonthNow())
   
    function handlerOnChangeDate(
        newValue: dayjs.Dayjs | null, 
        setDate: Dispatch<SetStateAction<Date>>) {
    
        if (newValue?.toDate())
        {
            setDate(newValue.toDate())
        }     
    }

    return (   
        <FilterContainer
            titulo="Copiar"
            Footer={(
            <>
                <button onClick={() => {
                    onCancel()
                }}>Cancelar</button>

                <button onClick={() => { 
                    onAply(dateFrom, dateTo)                           
                }}>Copiar</button>
            </>)}>

            <DatePicker       
                value={dayjs(dateFrom)}  
                onChange={(newValue) => handlerOnChangeDate(newValue, setDateFrom)}         
                label="Mês referência"                        
                sx={{width: '100%'}}                        
                format="DD/MM/YYYY"
            />

            <DatePicker  
                value={dayjs(dateTo)}                   
                label="Mês destino"                                                
                sx={{width: '100%'}}                        
                format="DD/MM/YYYY"
                onChange={(newValue) => handlerOnChangeDate(newValue, setDateTo)}         
            />
        </FilterContainer>                      
                              
    )
}