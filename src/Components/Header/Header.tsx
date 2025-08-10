import { useNavigate } from 'react-router-dom'
import MenuHamburguer from '../../Containers/Menu/MenuHamburguer'
import { auth } from '../../Services/FirebaseConnection'
import Logo from '../Logo/Logo'
import style from './Header.module.css'

export default function Header() {
    const navigate = useNavigate()

    return (
        <div className={style.container}>
            <header className={style.header}>
                <MenuHamburguer 
                    menuItems={[
                        {children: 'Home', onClick: () => navigate('/')},
                        {children: 'Cadastro Despesas', onClick: () => navigate('cadExpense')},                       
                    ]} />

                <Logo classNameControl={style.logo}/>
                <span onClick={() => auth.signOut()} className={style.sair}>Sair</span>                
            </header>
        </div>
    )
}