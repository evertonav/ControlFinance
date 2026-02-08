import { ContainerProps } from "../Container/Container";
import style from './ContainerFields.module.css'

export function ContainerFields({ children, className }: ContainerProps) {
    return (
        <div className={`${style.containerFields} ${className}`}>
            {children}
        </div>)
}