import style from './Login.module.css'
import InputCommon from "../../Components/Input/InputCommon";
import UseLogin from "./LoginHook";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Logo from '../../Components/Logo/Logo';
import { FormDataLogin, schemaLogin } from './schemas/SchemasLogin';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataLogin>(
        {
            resolver: zodResolver(schemaLogin),
            mode: "onChange"
        }
    )

    const { ExecuteLogin } = UseLogin()    
    
    function onSubmit(data: FormDataLogin) {          
        ExecuteLogin(data.email, data.password)
    }

    return (
    <form className={`${style.container}`} onSubmit={handleSubmit(onSubmit)}>

        <Logo 
            classNameControl={`${style.logo} ${style.logoMaxWidtGreat350}`} 
            classNameFinance={style.logoRest}/>

        <div className={`${style.containerFields} ${style.minWidthMobile}`}>
            <InputCommon 
                classNameContainer={style.widthFull} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                error={errors.email?.message}
                register={register}
                name="email"
                type="email"
                title="E-mail" 
                placeholder="Digite o seu email..."/>

            <InputCommon 
                classNameContainer={style.widthFull} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                placeholder="Digite a sua senha..."
                name="password" 
                error={errors.password?.message}
                register={register}
                type="password"
                title="Senha" />

            <button
                className={`${style.buttonAcessar} ${style.widthFull}`} 
                type="submit">
                
                Acessar
            </button>
        </div>        
    </form>)
}