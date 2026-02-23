import style from './TableCommom.module.css'

export function TableCommom({children, ...rest}: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) {
    return <table className={style.container} {...rest}>
        {children}
    </table>
}