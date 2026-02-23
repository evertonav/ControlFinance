import { DetailedHTMLProps, ThHTMLAttributes } from "react";
import style from './TableHeaderCellCommom.module.css'

export function TableHeaderCellCommom({children, ...rest}: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement> ) {
    return <th className={style.container} {...rest}>
        {children}
    </th>
}