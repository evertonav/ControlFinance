import { useQuery } from "@tanstack/react-query";
import { GetInvestimento } from "../../../Services/Investimento/GetInvestimento";
import { GetInvestimentosKey } from "../../../QueryKey/InvestimentoKey";
import toast from "react-hot-toast";

export function useGetInvestimento(user?: string) {
    const { data, ...rest } = useQuery({
        queryKey: GetInvestimentosKey(user),
        queryFn: async () => {                         
            return await GetInvestimento(user!).catch(error => {
                toast.error('Não foi possível carregar os dados. Detalhe erro: ' + error)
                throw error
            })
        },
        enabled: !!user,
        retry: false
    })

    return {
        investimentos: data,
        investimentosReturn: rest    
    }
}