import { useState } from "react";
import TabCommon from "../../Components/Tab/TabCommon";
import Container from "../../Containers/Container/Container";
import { TabsInvestimento } from "./Enum/TabsInvestimento";
import { TabListagemInvestimento } from "./Tabs/TabListagemInvestimento";
import { CadInvestimento } from "./Tabs/CadInvestimento/CadInvestimento";
import { Investimento } from "./Tabs/CadInvestimento/Types";

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
                        children: <CadInvestimento onSuccess={(value: Investimento) => console.log('Deu bom: ', value)}/>  
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