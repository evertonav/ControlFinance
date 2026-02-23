import { DetailedHTMLProps, HTMLAttributes } from "react";
import style from './TableRowCommom.module.css'

interface TableRowCommomProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
    backGroundColor?: 'Black'
}

export function TableRowCommom({children, backGroundColor, ...rest}: TableRowCommomProps) {
    return <tr className={`${style.container} ${style['backGroundColor' + backGroundColor]}`} {...rest}>
        {children}
    </tr>
}