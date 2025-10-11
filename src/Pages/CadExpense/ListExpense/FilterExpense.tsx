import { DatePicker } from "@mui/x-date-pickers"
import { ContainerModalFullScreen } from "../../../Containers/Container/ContainerModalFullScreen"
import ShowIcon from "../../../Components/ShowIcon/ShowIcon"
import style from './FilterExpense.module.css'
import { useState } from "react"
import dayjs from "dayjs"
import { FilterContainer } from "../../../Containers/FilterContainer/FilterContainer"

interface FilterExpenseProps {
    dateInitialFilter?: Date,
    DateFinishFilter?: Date,
    onAply: (dateInicial?: Date, dateFinish?: Date) => void
}

export function FilterExpense({
    onAply, 
    dateInitialFilter = new Date(), 
    DateFinishFilter = new Date()} : FilterExpenseProps)
{
    const [openFilterExpense, setOpenFilterExpense] = useState(false)
    const [dateInitial, setDateInitial] = useState<Date>(dateInitialFilter)
    const [dateFinish, setDateFinish] = useState<Date>(DateFinishFilter)
    
    return (
        <>
            <div className={style.containerCabecalho}>
                <button className={style.buttonSearch} onClick={() => setOpenFilterExpense(true)}>
                    <ShowIcon nameIcon='filter_alt' className={style.colorIconSearch}/>
                </button>
            </div> 

            <ContainerModalFullScreen open={openFilterExpense}>
                <FilterContainer
                    titulo="Filtro"
                    Footer={(
                    <>
                        <button onClick={() => setOpenFilterExpense(false)}>Cancelar</button>

                        <button onClick={() => { 
                            setOpenFilterExpense(false)
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
            </ContainerModalFullScreen>                   
        </>
    )
     
}