import ShowIcon, { ShowIconProps } from "./ShowIcon";
import style from './ShowIconBlue.module.css'

interface ShowIconBlueProps extends ShowIconProps {
}

export function ShowIconBlue({className, ...rest} : ShowIconBlueProps) {
    return <ShowIcon className={`${style.colorIcon} ${className}`} {...rest}/>
}