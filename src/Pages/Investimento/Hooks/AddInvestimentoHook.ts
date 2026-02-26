import { useMutation } from "@tanstack/react-query"
import { Investimento } from "../Tabs/CadInvestimento/Types"
import { EntityInvestimento } from "../../../Services/Investimento/@Types"
import toast from "react-hot-toast"
import { AddInvestimento } from "../../../Services/Investimento/AddInvestimento"
import { GetUserLogado } from "../../../Services/Login/Logar"
import { ConvertStringToNumber } from "../../../Utils/Date/ConvertNumber"

export function useAddInvestimento() {
    const addInvestimentoMutation = useMutation({
        mutationFn: async (data: { investimento: EntityInvestimento}) => {                              
            await AddInvestimento(data.investimento)            
        },
        onSuccess: () => {
            toast.success('Registro salvo com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao cadastrar no banco: ${error}`)                        
        }
    }) 
    
    
    function addInvestimento(investimento: Investimento): Promise<void> {
        const userLogin = GetUserLogado()
        const periodicity = ConvertStringToNumber(investimento.periodicidade)

        if (!periodicity) {
            toast.error('Periodicidade inválida, preencha corretamente!')
            Promise.reject('Você preecisa preencher os dados corretamente.') 
        }

        if (userLogin === '') {
            toast.error('Você precisa estar logado no sistema, faça login novamente!')
            Promise.reject('Você preecisa preencher os dados corretamente.')
        }

        return addInvestimentoMutation.mutateAsync({
            investimento: {
                title: investimento.title,
                dateFim: investimento.dateFim,
                periodicidade: periodicity!,
                value: investimento.value,
                idCorretora: investimento.idCorretora,
                user: userLogin
        }})
    }    

    const { mutate, mutateAsync, context, ...resto } = addInvestimentoMutation;

    return {
        addInvestimento,
        returnAddInvestimento: resto
    }
}