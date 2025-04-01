export function ConverterDataParaPadraoVisual(data: Date) : string {    
    return `${data.getDate().toString().padStart(2, '0')}/${data.getMonth() + 1}/${data.getFullYear()}`
}