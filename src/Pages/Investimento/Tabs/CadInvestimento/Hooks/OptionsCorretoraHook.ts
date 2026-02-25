import { useMemo } from "react"
import { Corretoras, CorretorasDescricao } from "../Enum/CorretorasEnum"
import { MenuItemProps } from "@mui/material"

export function useOptionsCorretora() {
    const optionsCorretora: MenuItemProps[] = useMemo(() => {
        return Object
                    .values(Corretoras)
                    .filter((value): value is Corretoras => typeof value === "number")
                    .map((value) => {           
                        return {
                            value: value.toString(),
                            children: CorretorasDescricao[value as Corretoras]
                        }})
    }, [])

    return { optionsCorretora }
    
}