import { InputHTMLAttributes } from "react"

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