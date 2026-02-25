import { useState } from "react";
import TabCommon from "../../Components/Tab/TabCommon";
import Container from "../../Containers/Container/Container";
import { TabsInvestimento } from "./Enum/TabsInvestimento";
import { CadInvestimento } from "./Tabs/CadInvestimento/CadInvestimento";
import { Investimento } from "./Tabs/CadInvestimento/Types";
import { useAddInvestimento } from "./Hooks/AddInvestimentoHook";
import { ListagemInvestimento } from "./Tabs/ListInvestimento/ListagemInvestimento";
import { Periodicitys } from "./Tabs/CadInvestimento/Enum/PeriodicitysEnum";

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
                        children: <ListagemInvestimento investimentos={[
                            {title: 'Primeiro investimento', value: '1', dateFim: 11212, periodicidade: Periodicitys.LiquidezDiaria},
                            {title: 'segundos investimento', value: '1', dateFim: 11212, periodicidade: Periodicitys.LiquidezDiaria}
                        ]}/>
                    }
                ]
                }
            />
    </Container>)
}