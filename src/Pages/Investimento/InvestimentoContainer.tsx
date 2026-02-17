import { useState } from "react";
import TabCommon from "../../Components/Tab/TabCommon";
import Container from "../../Containers/Container/Container";
import { TabsInvestimento } from "./Enum/TabsInvestimento";
import { TabListagemInvestimento } from "./Tabs/TabListagemInvestimento";
import { TabCadInvestimento } from "./Tabs/CadInvestimento/TabCadInvestimento";

export function InvestimentoContainer() {
    const [aba, setAba] = useState<string>(TabsInvestimento.Cadastro)

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
                        children: <TabCadInvestimento />  
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