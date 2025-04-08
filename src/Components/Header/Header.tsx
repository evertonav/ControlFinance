import { auth } from '../../Services/FirebaseConnection'
import Logo from '../Logo/Logo'
import style from './Header.module.css'

export default function Header() {
    return (
        <div className={style.container}>
            <header className={style.header}>
                <Logo classNameControl={style.logo}/>
                <span onClick={() => auth.signOut()} className={style.sair}>Sair</span>                
            </header>
        </div>
    )
}