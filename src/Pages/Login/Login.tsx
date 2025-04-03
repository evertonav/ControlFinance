import { ChangeEvent, FormEvent } from "react";
import style from './Login.module.css'
import InputCommon from "../../Components/Input/InputCommon";
import UseLogin from "./UseLogin";


export default function Login() {
    const { 
        ExecuteLogin,
        email,
        setEmail,
        password,
        setPassword
     } = UseLogin()    
    
    function handlerOnSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        ExecuteLogin()
    }

    return (
    <form className={style.container} onSubmit={handlerOnSubmitForm}>

        <h1 className={style.logo}>Control <span className={style.logoRest}>Finance</span></h1>

        <div className={style.containerFields}>
            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                type="email"
                title="E-mail" 
                placeholder="Digite o seu email..."
                value={email} 
                onChange={(e: ChangeEvent<HTMLInputElement> ) => setEmail(e.target.value)}/>

            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                className={style.colorWhite}
                placeholder="Digite a sua senha..." 
                type="password"
                title="Senha" 
                value={password} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>

            <button
                className={`${style.buttonAcessar} ${style.width50Percent}`} 
                type="submit">
                
                Acessar
            </button>
        </div>        
    </form>)
}