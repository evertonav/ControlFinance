import style from './Logo.module.css'

interface LogoProps {
    classNameControl?: string
    classNameFinance?: string
}

export default function Logo({classNameControl, classNameFinance} : LogoProps) {
    return (
        <h1 className={`${style.logo} ${classNameControl}`}>Control <span className={`${style.logoRest} ${classNameFinance}`}>Finance</span></h1>
    )
}