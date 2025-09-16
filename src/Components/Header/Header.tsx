import { useNavigate } from 'react-router-dom'
import MenuHamburguer from '../../Containers/Menu/MenuHamburguer'
import { auth } from '../../Services/FirebaseConnection'
import Logo from '../Logo/Logo'
import style from './Header.module.css'
import { MenuItem } from '@mui/material'
import { useState } from 'react'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };
    

    return (
        <div className={style.container}>
            <header className={style.header}>
                <MenuHamburguer 
                    button={{onClick: handleClick}} 
                    menu={{
                        open: open, 
                        anchorEl: anchorEl,
                        onClose: handleClose,
                        children: 
                        [
                            <MenuItem key={0} onClick={() => {
                              navigate('/');
                              setOpen(false);
                            }}>
                              Home
                            </MenuItem>,
                            
                            <MenuItem key={1} onClick={() => {
                              navigate('cad-expense');
                              setOpen(false);
                            }}>
                              Cadastro Despesas
                            </MenuItem>
                        ]}}/>                    

                <Logo classNameControl={style.logo}/>

                <span onClick={() => auth.signOut()} className={style.sair}>Sair</span>                
            </header>
        </div>
    )
}