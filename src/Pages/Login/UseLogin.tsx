import { useState } from "react"
import toast from "react-hot-toast"
import { Logar } from "../../Services/Login/Logar"
import { useNavigate } from "react-router-dom"

export default function UseLogin() {
    const navegar = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function ExecuteLogin() {
        if (email === '' || password === '') {
            toast.error('Você precisa preencher os campos!')
            return 
        }

        Logar(email, password)
        .then(() => {
            toast.success('Logado com sucesso!')
            navegar('/cadExpense', { replace: true }) 
        }).catch((error) => {
            toast.error('Erro: ' + error)
        })     

    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        ExecuteLogin 
    }
}