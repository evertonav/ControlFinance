import { DetailedHTMLProps, TdHTMLAttributes } from "react";
import style from './TableCellDataCommom.module.css'

export function TableCellDataCommom({ children, className, ...rest } : DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>) {
    return (
        <td className={`${style.label} ${className}`} {...rest}>
            {children}
        </td>
    )
}