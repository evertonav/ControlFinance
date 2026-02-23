import { DetailedHTMLProps, HTMLAttributes } from "react";

export function TableBodyCommom({ children, ...rest } : DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>) {
    return (
        <tbody {...rest}>
            {children}
        </tbody>
    )
}