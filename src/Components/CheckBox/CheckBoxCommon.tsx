import { ChangeEvent, InputHTMLAttributes } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form"
import style from './CheckBoxCommon.module.css'

//Atualizar a pasta no git

interface CheckBoxCommonProps extends InputHTMLAttributes<HTMLInputElement> {  
    title: string
    register?: UseFormRegister<any>
    error?: string
    rules?: RegisterOptions
}

export default function CheckBoxCommon({title, register, error, rules, ...rest} : CheckBoxCommonProps) {
    const {onChange: onChangeRegister, ...restRegister} = {...(register ? register(rest.name ?? '', rules) : {})}

    function handlerOnChange(event: ChangeEvent<HTMLInputElement>) {

        if (rest.onChange)
        {
            rest.onChange(event)
        }
            
        
        if (onChangeRegister) {
            onChangeRegister(event)
        }       
    }

    return (
        <label>
            <input
                type="checkbox"
                checked={rest.checked}
                onChange={handlerOnChange}
                {...restRegister}                
                />
            {title}    
            {error && <p className={`${style.colorRed} ${style.messageError}`}>{error}</p>}        
        </label>
        )
}