import { FormEvent, useState } from "react";
import InputCommon from "../../components/Input/InputCommon";
import style from './Login.module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../Services/FirebaseConnection";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navegar = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    

    function handlerOnSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()


        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {            
            console.log('Logado com sucesso!')
            navegar('/cad_expense')
        })
        .catch((error) => {
            console.log('Erro: ', error)
        }) 
    }

    return (
    <form className={style.container} onSubmit={handlerOnSubmitForm}>
        <div className={style.containerFields}>
            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull} 
                title="E-mail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

            <InputCommon 
                classNameContainer={style.width50Percent} 
                classNameContainerInput={style.widthFull}  
                title="Senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)}/>
            <button type="submit">Acessar</button>
        </div>        
    </form>)
}