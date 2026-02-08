import { ButtonHTMLAttributes } from 'react'
import style from './ButtonCommon.module.css'

interface ButtonCommomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function ButtonCommom({children, className, ...rest} : ButtonCommomProps) {
    return (
        <button className={`${style.button} ${className}`} {...rest}>
            {children}
        </button>
    )
}