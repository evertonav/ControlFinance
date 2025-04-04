import { InputHTMLAttributes } from 'react'
import style from './InputCommon.module.css'
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputCommonProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameContainer?: string;
    classNameContainerInput?: string
    title: string
    register?: UseFormRegister<any>
    error?: string
    rules?: RegisterOptions
}

export default function InputCommon(
    { 
        name, 
        title, 
        register, 
        error, 
        rules, 
        classNameContainer = '', 
        classNameContainerInput, 
        ...rest
    } : InputCommonProps
) {

    return (
        <div className={`${style.containerCampo}  ${classNameContainer}`}>
            <label className={style.titulo}>{title}</label>
        
            <div className={`${style.containerTexto} ${classNameContainerInput}`}>
                <input 
                  id={name} 
                  {...(register ? register(name ?? '', rules) : {})}
                  {...rest} />
                
            </div>
            {error && <p className={`${style.colorRed} ${style.messageError}`}>{error}</p>}
       </div>  

    )
}