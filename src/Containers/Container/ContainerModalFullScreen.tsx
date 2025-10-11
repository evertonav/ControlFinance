import { ContainerProps } from "./Container";
import style from './ContainerModalFullScreen.module.css'

interface ContainerModalFullScreen extends ContainerProps {
    open: boolean
}

export function ContainerModalFullScreen({ children, className, open }: ContainerModalFullScreen) {
    return (
        open ?
            <div className={`${style.container} ${className}`}>
                {children}
            </div>
        : 
            <></>
    )
}