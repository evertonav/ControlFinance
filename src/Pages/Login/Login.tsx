import style from './Login.module.css'
import InputCommon from "../../Components/Input/InputCommon";
import UseLogin from "./UseLogin";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Logo from '../../Components/Logo/Logo';

const schema = z.object(
    {
        email: z.string().email('Insira um email válido').nonempty("O campo e-mail é obrigatório."),
        password: z.string().nonempty("O campo senha é obrigatório.")
    }
)

type FormData = z.infer<typeof schema>

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>(
        {
            resolver: zodResolver(schema),
            mode: "onChange"
        }
    )

    const { ExecuteLogin } = UseLogin()    
    
    function onSubmit(data: FormData) {          
        ExecuteLogin(data.email, data.password)
    }

    return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>

        <Logo/>

        <div className={style.containerFields}>
            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                error={errors.email?.message}
                register={register}
                name="email"
                type="email"
                title="E-mail" 
                placeholder="Digite o seu email..."/>

            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                placeholder="Digite a sua senha..."
                name="password" 
                error={errors.password?.message}
                register={register}
                type="password"
                title="Senha" />

            <button
                className={`${style.buttonAcessar} ${style.width50Percent}`} 
                type="submit">
                
                Acessar
            </button>
        </div>        
    </form>)
}