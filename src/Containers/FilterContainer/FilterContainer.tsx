import { ReactNode } from "react"
import style from './FilterContainer.module.css'
import { ContainerProps } from "../Container/Container"

interface FilterContainer extends ContainerProps {
    titulo: ReactNode,
    Footer: ReactNode
}

export function FilterContainer({Footer, className, children, titulo} : FilterContainer) {
    return (
        <div className={`${style.containerFilter} ${className}`}>

            <div className={style.containerCabecalhoFilter}>                        
                {titulo}
            </div>
                
            <div className={style.containerFields}>
                {children}
            </div>
                
            <div className={style.containerFooterFilter}>
                {Footer}
            </div>
        </div>
    )      
}