import { ButtonBaseProps} from "@mui/material";
import style from './ButtonArredondado.module.css'

interface ButtonArredondadoProps extends ButtonBaseProps {
}

export function ButtonArredondado({children, className, ...rest} : ButtonArredondadoProps) {
    return (
        <button className={`${style.button} ${className}`} {...rest}>
            {children}
        </button>
    )
}