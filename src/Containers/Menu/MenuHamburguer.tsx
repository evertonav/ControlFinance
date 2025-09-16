import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import style from './MenuHamburguer.module.css'
import ShowIcon from '../../Components/ShowIcon/ShowIcon';

interface MenuHamburguerProps {
  button?: IconButtonProps
  menu: MenuProps  
}

export default function MenuHamburguer({button, menu}: MenuHamburguerProps) { 
  return (
    <div>      
      <IconButton
        size={button?.size ? button.size : "large"}
        edge={button?.edge ? button.edge : "start"}
        color={button?.color ? button.color : "inherit"}
        aria-label={button?.['aria-label'] ? button['aria-label'] : "menu"}
        onClick={button?.onClick}
        {...button}
      >
        {button?.children ? button.children : <ShowIcon nameIcon='menu' className={style.icon}/>}        
      </IconButton>
      
      <Menu {...menu}>
        {menu.children}
      </Menu>      
    </div>
  );
}
