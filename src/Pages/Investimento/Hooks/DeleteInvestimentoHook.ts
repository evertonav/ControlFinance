import { useMutation } from "@tanstack/react-query";
import { DeleteInvestimento } from "../../../Services/Investimento/DeleteInvestimento";
import toast from "react-hot-toast";

export function useDeleteInvestimento() {
    const deleteMutationInvestimento = useMutation({
        mutationFn: async (data: { id: string}) => {                              
            await DeleteInvestimento(data.id)            
        },
        onSuccess: () => {
            toast.success('Registro deletado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao deletar no banco: ${error}`)                        
        }
    }) 

    function deleteInvestimento(id?: string): Promise<void> {  
        if (!id) {
            toast.error('Você precisa preencher o id!')
            throw new Error('Ainda não foi preenchido. (useDeleteInvestimento.deleteInvestimento) ')
        }
        
        return deleteMutationInvestimento.mutateAsync({
            id
        })
    }    

    const { mutate, mutateAsync, context, ...resto } = deleteMutationInvestimento;

    return {
        deleteInvestimento,
        returnDeleteInvestimento: resto
    }
}