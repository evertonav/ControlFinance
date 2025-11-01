import toast from "react-hot-toast"
import { Logar } from "../../Services/Login/Logar"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

export default function UseLogin() {
    const navegar = useNavigate()

    const logarMutation = useMutation({
        mutationFn: async (data: {email: string, password: string}) => {
            return Logar(data.email, data.password)
        },
        onSuccess: () => {
            toast.success('Logado com sucesso!')
            navegar('/', { replace: true }) 
        },
        onError: (error, variables) => {
            toast.error('Não foi possível fazer login. Verifique o log.')
            console.error('Error: ', error, ' variaveis: ', variables)
        }
    })

    function ExecuteLogin(email: string, password: string) {    
        logarMutation.mutate({email, password})      
    }

    return { ExecuteLogin }
}