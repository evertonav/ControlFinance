import { useMemo } from "react"
import { Periodicitys, PeriodicitysDescription } from "../Enum/PeriodicitysEnum"

export function useOptionsPeriodicity() {
    const optionsPeriodicity = useMemo(() => {
             return Object.values(Periodicitys).map((value: string) => ({
                        value,
                        label: PeriodicitysDescription[value as Periodicitys]
                      }))
        }, [])
    
    return { optionsPeriodicity }
}