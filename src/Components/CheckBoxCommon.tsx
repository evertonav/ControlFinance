import { InputHTMLAttributes } from "react"

//Atualizar a pasta no git

interface CheckBoxCommonProps extends InputHTMLAttributes<HTMLInputElement> {  
    title: string
}

export default function CheckBoxCommon({title, ...rest} : CheckBoxCommonProps) {
    return (
        <label>
            <input
                type="checkbox"
                checked={rest.checked}
                onChange={rest.onChange}
                />
            {title}
        </label>)
}