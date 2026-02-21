import { useMemo } from "react"
import { Corretoras, CorretorasDescricao } from "../Enum/CorretorasEnum"
import { MenuItemProps } from "@mui/material"

export function useOptionsCorretora() {
    const optionsCorretora: MenuItemProps[] = useMemo(() => {
        return  Object.values(Corretoras).map((value: string) => ({
            value,
            children: CorretorasDescricao[value as Corretoras]
          }))
    }, [])

    return { optionsCorretora }
    
}