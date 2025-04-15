export function ConvertStringToNumber(value: string): number | undefined {
    const valueConverted = Number(value)
    
    if (value === '' || isNaN(valueConverted)) {
        
        return undefined
    } 

    return valueConverted
}