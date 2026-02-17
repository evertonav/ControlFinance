import { useMemo } from "react"

export function useOptionsPeriodicity() {
    const optionsPeriodicity = useMemo(() => {
            return [
                {value: '1', label: "Liquidez diária"},
                {value: '2', label: "3 meses"},
                {value: '3', label: "6 meses"},
                {value: '4', label: "1 ano"}]
        }, [])
    
        return { optionsPeriodicity }
}