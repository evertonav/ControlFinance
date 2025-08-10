import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import style from './MenuHamburguer.module.css'
import ShowIcon from '../../Components/ShowIcon/ShowIcon';

interface MenuHamburguerProps {
  menu?: MenuProps
  menuItems: Array<MenuItemProps>
}

export default function MenuHamburguer({menu, menuItems}: MenuHamburguerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>      
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <ShowIcon nameIcon='menu' className={style.icon}/>
      </IconButton>

      <Menu
        anchorEl={menu?.anchorEl ? menu.anchorEl : anchorEl}
        open={menu?.open ? menu.open : open}
        onClose={menu?.onClose ? menu.onClose : handleClose}
      >
        {menuItems.map((item, index) => {
          const {children, ...rest} = item 

          return (
            <MenuItem key={index} {...rest}>
              {children}
            </MenuItem>)
        })}
      </Menu>
    </div>
  );
}
