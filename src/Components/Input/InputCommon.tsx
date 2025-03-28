import { InputHTMLAttributes } from 'react'
import style from './InputCommon.module.css'

interface InputCommonProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameContainer?: string;
    classNameContainerInput?: string
    title: string
}

export default function InputCommon(
    {title, classNameContainer = '', classNameContainerInput, ...rest} : InputCommonProps
) {
    return (
        <div className={`${style.containerCampo}  ${classNameContainer}`}>
            <label className={style.titulo}>{title}</label>
        
            <div className={`${style.containerTexto} ${classNameContainerInput}`}>
                <input {...rest} />
            </div>
      </div>  
    )
}