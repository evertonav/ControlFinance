import { useMemo } from "react"

export function useOptionsCorretora() {
    const optionsCorretora = useMemo(() => {
        return [
            {value: 1, children: 'NuBank'},
            {value: 2, children: 'PicPay'},
            {value: 3, children: 'Inter'},
            {value: 4, children: 'Binance'},
        ]
    }, [])

    return { optionsCorretora }
    
}