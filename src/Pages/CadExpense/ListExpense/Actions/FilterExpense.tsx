import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import dayjs from "dayjs"
import { FilterContainer } from "../../../../Containers/FilterContainer/FilterContainer"

interface FilterExpenseProps {
    dateInitialFilter?: Date,
    dateFinishFilter?: Date,
    onCancel: () => void
    onAply: (dateInicial?: Date, dateFinish?: Date) => void
}

export function FilterExpense({
    onAply, 
    onCancel,
    dateInitialFilter = new Date(), 
    dateFinishFilter = new Date()} : FilterExpenseProps)
{
    const [dateInitial, setDateInitial] = useState<Date>(dateInitialFilter)
    const [dateFinish, setDateFinish] = useState<Date>(dateFinishFilter)
    
    return (                   
        <FilterContainer
            titulo="Filtro"
            Footer={(
            <>
                <button onClick={() => onCancel()}>Cancelar</button>

                <button onClick={() => {                     
                    onAply(dateInitial, dateFinish)                           
                }}>Aplicar</button>
            </>)}>

            <DatePicker
                label="Data início"
                value={dayjs(dateInitial)}
                onChange={(newValue) =>  setDateInitial(newValue?.toDate() ?? new Date())}
                sx={{width: '100%'}}                        
                format="DD/MM/YYYY"
            />

            <DatePicker
                label="Data fim"
                value={dayjs(dateFinish ?? new Date().valueOf())}
                onChange={(newValue) => setDateFinish(newValue?.toDate() ?? new Date())}
                sx={{width: '100%'}}                        
                format="DD/MM/YYYY"
            />
        </FilterContainer>                                                

    )
     
}