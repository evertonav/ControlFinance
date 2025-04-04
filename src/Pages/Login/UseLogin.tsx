import toast from "react-hot-toast"
import { Logar } from "../../Services/Login/Logar"
import { useNavigate } from "react-router-dom"

export default function UseLogin() {
    const navegar = useNavigate()

    function ExecuteLogin(email: string, password: string) {

        Logar(email, password)
        .then(() => {
            toast.success('Logado com sucesso!')
            navegar('/cadExpense', { replace: true }) 
        }).catch((error) => {
            toast.error('Não foi possível fazer login. Verifique o log.')
            console.error('Error: ', error)
        })     

    }

    return { ExecuteLogin }
}