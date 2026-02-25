import { useQuery } from "@tanstack/react-query";
import { GetInvestimento } from "../../../Services/Investimento/GetInvestimento";
import { GetInvestimentosKey } from "../../../QueryKey/InvestimentoKey";

export function useGetInvestimento(user?: string) {
    const { data, ...rest } = useQuery({
        queryKey: GetInvestimentosKey(user),
        queryFn: async () => {                         
            return await GetInvestimento(user!)   
        },
        enabled: !!user        
    })

    return {
        investimentos: data,
        investimentosReturn: rest    
    }
}