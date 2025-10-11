import { useState } from 'react';
import Container from '../../Containers/Container/Container';
import TabCommon from '../../Components/Tab/TabCommon';
import FormCadExpense from './FormCadExpense/FormCadExpense';
import ListExpense from './ListExpense/ListExpense';
import { TabsCadastroExpenseEnum } from './Enum/TabsCadastroExpense';


export default function CadExpense() {  
  const [aba, setAba] = useState<string>(TabsCadastroExpenseEnum.Cadastro)

  return (  
    <Container>      
      <TabCommon
        setValue={setAba}        
        value={aba}
        tabs={
          [
            {
              id: TabsCadastroExpenseEnum.Cadastro,
              description: 'Cadastro',
              children: <FormCadExpense />  
            },
            {
              id: TabsCadastroExpenseEnum.Listagem,
              description: 'Listagem',
              children: <ListExpense setAba={setAba}/> 
            }
          ]
        }
      />
    </Container>     
          
  )
}