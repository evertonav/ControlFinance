import { DetailedHTMLProps, HTMLAttributes } from "react";

export function TableHeaderCommom({children, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>) {
    return <thead {...rest}>
        {children}
    </thead>
}