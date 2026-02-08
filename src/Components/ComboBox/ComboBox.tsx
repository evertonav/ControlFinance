import { InputLabel, InputLabelProps, MenuItem, MenuItemProps, Select, SelectProps } from "@mui/material";

interface ComboBoxProps {
    title?: InputLabelProps
    combo: SelectProps
    itensCombo: Array<MenuItemProps>
}

export function ComboBox({ combo, itensCombo, title} : ComboBoxProps) {
    return (
        <>
            {title && <InputLabel {...title}>{title.children}</InputLabel> } 
            
            <Select {...combo}>
                {itensCombo.map(item => {
                    return <MenuItem {...item}>{item.children}</MenuItem>
                })}                       
            </Select>        
        </>
    )
}