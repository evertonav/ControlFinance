import { FormControlLabel, FormControlLabelProps, FormLabel, FormLabelProps, Radio, RadioGroup, RadioGroupProps } from "@mui/material";
import { ReactElement } from "react";

interface RadioGroupCommomProps {
    title?: FormLabelProps 
    group: RadioGroupProps
    itensRadio: Array<Omit<FormControlLabelProps, 'control'> & { control?: ReactElement<unknown, any> }> 
}

export function RadioGroupCommom({ title, group, itensRadio }: RadioGroupCommomProps) {
    return (
        <>
            {title && (<FormLabel {...title}>{title.children}</FormLabel>)}
            
            <RadioGroup {...group}>
                {itensRadio.map((item, index) => {
                    return <FormControlLabel key={index} {...item} control={item.control ?? <Radio />} />
                })}                       
            </RadioGroup>
        </>
    )
}