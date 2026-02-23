import { useState } from "react";
import TabCommon from "../../Components/Tab/TabCommon";
import Container from "../../Containers/Container/Container";
import { TabsInvestimento } from "./Enum/TabsInvestimento";
import { TabListagemInvestimento } from "./Tabs/ListInvestimento/ListagemInvestimento";
import { CadInvestimento } from "./Tabs/CadInvestimento/CadInvestimento";
import { Investimento } from "./Tabs/CadInvestimento/Types";
import { useAddInvestimento } from "./Hooks/AddInvestimentoHook";

export function InvestimentoContainer() {
    const [aba, setAba] = useState<string>(TabsInvestimento.Cadastro)
    const { addInvestimento } = useAddInvestimento()

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
                            await addInvestimento(value)
                        }}/>  
                    },
                    {
                        id: TabsInvestimento.Listagem,
                        description: 'Listagem',
                        children: <TabListagemInvestimento/>
                    }
                ]
                }
            />
    </Container>)
}