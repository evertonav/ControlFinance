 import { TableBodyCommom } from '../../../../Components/Grid/TableBodyCommom'
import { TableCellDataCommom } from '../../../../Components/Grid/TableCellDataCommom'
import { TableCommom } from '../../../../Components/Grid/TableCommom'
import { TableHeaderCellCommom } from '../../../../Components/Grid/TableHeaderCellCommom'
import { TableHeaderCommom } from '../../../../Components/Grid/TableHeaderCommom'
import { TableRowCommom } from '../../../../Components/Grid/TableRowCommom'
import { EntityInvestimento } from '../../../../Services/Investimento/types'
import { ConverterDataParaPadraoVisual } from '../../../../Utils/Date/ConvertDate'
import { Corretoras, CorretorasDescricao } from '../CadInvestimento/Enum/CorretorasEnum'

interface ListagemInvestimentoProps {
    investimentos: Array<EntityInvestimento>
}

export function ListagemInvestimento({investimentos} : ListagemInvestimentoProps) {
    
    return (
        <TableCommom>
            <TableHeaderCommom>
                <TableRowCommom>
                    <TableHeaderCellCommom scope="col">Título</TableHeaderCellCommom>
                    <TableHeaderCellCommom scope="col">Valor</TableHeaderCellCommom>                                
                    <TableHeaderCellCommom scope="col">Data Final</TableHeaderCellCommom>    
                    <TableHeaderCellCommom scope="col">Corretora</TableHeaderCellCommom>

                </TableRowCommom>
            </TableHeaderCommom>

            <TableBodyCommom>         
                {investimentos.map((item, index) => {
                    return (
                        <TableRowCommom backGroundColor='Black'>
                            <TableCellDataCommom key={index} data-label='Título'> {item.title} </TableCellDataCommom>
                            <TableCellDataCommom key={index + 2} data-label='Valor'> {item.value} </TableCellDataCommom>
                            <TableCellDataCommom key={index + 3} data-label='Data Final'> {ConverterDataParaPadraoVisual(new Date(item.dateFim))} </TableCellDataCommom>
                            <TableCellDataCommom key={index + 4} data-label='Corretora'> {item.idCorretora ? CorretorasDescricao[item.idCorretora as Corretoras] : 'Sem Corretora'} </TableCellDataCommom>
                        </TableRowCommom>  
                    )
                })}       
                                                         
            </TableBodyCommom>
        </TableCommom>
    )
}