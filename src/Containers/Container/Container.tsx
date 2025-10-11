import { ReactNode } from "react"
import style from './Container.module.css'

export interface ContainerProps {
    children: ReactNode
    className?: string
}

export default function Container({children, className = ''} : ContainerProps) {
    return (
        <div className={`${style.container}`}>            
            <div className={`${style.containerComBorder} ${className}`}>
                {children}
            </div>
        </div>
        
    )
}