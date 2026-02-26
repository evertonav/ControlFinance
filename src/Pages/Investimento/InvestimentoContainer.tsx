import { useState } from "react";
import TabCommon from "../../Components/Tab/TabCommon";
import Container from "../../Containers/Container/Container";
import { TabsInvestimento } from "./Enum/TabsInvestimento";
import { CadInvestimento } from "./Tabs/CadInvestimento/CadInvestimento";
import { Investimento } from "./Tabs/CadInvestimento/Types";
import { useAddInvestimento } from "./Hooks/AddInvestimentoHook";
import { ListagemInvestimento } from "./Tabs/ListInvestimento/ListagemInvestimento";
import { useGetInvestimento } from "./Hooks/GetInvestimentoHook";
import { GetUserLogado } from "../../Services/Login/Logar";
import { useInvalidateQuery } from "../../Hooks/InvalidateQueryHook";
import { GetInvestimentosKey } from "../../QueryKey/InvestimentoKey";
import { useDeleteInvestimento } from "./Hooks/DeleteInvestimentoHook";
import { EntityInvestimento } from "../../Services/Investimento/@Types";

export function InvestimentoContainer() {
    const [aba, setAba] = useState<string>(TabsInvestimento.Cadastro)

    const { invalidateQuery } = useInvalidateQuery()

    const { deleteInvestimento } = useDeleteInvestimento()
    const { addInvestimento } = useAddInvestimento()
    const {investimentos} = useGetInvestimento(GetUserLogado())    

    function ReloadInvestimentos() {
        invalidateQuery(GetInvestimentosKey(GetUserLogado()))
    }

    return (
        <Container>      
            <TabCommon
                setValue={setAba}        
                value={aba}
                tabs={
                [
                    {
                        id: TabsInvestimento.Cadastro,
                        description: 'Cadastro',
                        children: <CadInvestimento onSuccess={async (value: Investimento) => {                            
                            await addInvestimento(value).then(() => {
                                ReloadInvestimentos()
                            })
                        }}/>  
                    },
                    {
                        id: TabsInvestimento.Listagem,
                        description: 'Listagem',
                        children: <ListagemInvestimento 
                                    onDelete={(value: EntityInvestimento) => {
                                        deleteInvestimento(value.id).then(() => {
                                            ReloadInvestimentos()
                                        })
                                    }} 
                                    investimentos={investimentos ?? []}
                                  />
                    }
                ]
                }
            />
        </Container>)
}