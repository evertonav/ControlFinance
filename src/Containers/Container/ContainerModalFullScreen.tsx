import { forwardRef, useImperativeHandle, useState } from "react";
import { ContainerProps } from "./Container";
import style from './ContainerModalFullScreen.module.css'

interface ContainerModalFullScreen extends ContainerProps {
}

export interface ContainerModalElement {
    open: () => void
    close: () => void
}

export const ContainerModalFullScreen = forwardRef<ContainerModalElement, ContainerModalFullScreen>(
    ({children, className}, ref) => {
        const [openInternal, setOpenInternal] = useState(false)

        useImperativeHandle(ref, () => ({
            open: () => setOpenInternal(true),
            close: () => setOpenInternal(false),            
          }));

        return (
            openInternal ?
                <div className={`${style.container} ${className}`}>
                    {children}
                </div>
            : 
                <></>
        )
    
    }
)