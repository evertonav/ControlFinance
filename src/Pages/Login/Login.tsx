import { FormEvent, useState } from "react";
import style from './Login.module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../Services/FirebaseConnection";
import { useNavigate } from "react-router-dom";
import InputCommon from "../../components/Input/InputCommon";


export default function Login() {
    const navegar = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    

    function handlerOnSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (email === '' || senha === '') {
            alert("Preencha todos os campos!")
            return
        }

        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {            
            alert('Logado com sucesso!')
            navegar('/cadExpense', { replace: true })
        })
        .catch((error) => {
            alert('Erro: ' + error)
        }) 
    }

    return (
    <form className={style.container} onSubmit={handlerOnSubmitForm}>

        <h1 className={style.logo}>Control <span className={style.logoRest}>Finance</span></h1>

        <div className={style.containerFields}>
            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                type="email"
                title="E-mail" 
                placeholder="Digite o seu email..."
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                placeholder="Digite a sua senha..." 
                type="password"
                title="Senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)}/>

            <button
                className={`${style.buttonAcessar} ${style.width50Percent}`} 
                type="submit">
                
                Acessar
            </button>
        </div>        
    </form>)
}