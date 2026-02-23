 import { TableBodyCommom } from '../../../../Components/Grid/TableBodyCommom'
import { TableCellDataCommom } from '../../../../Components/Grid/TableCellDataCommom'
import { TableCommom } from '../../../../Components/Grid/TableCommom'
import { TableHeaderCellCommom } from '../../../../Components/Grid/TableHeaderCellCommom'
import { TableHeaderCommom } from '../../../../Components/Grid/TableHeaderCommom'
import { TableRowCommom } from '../../../../Components/Grid/TableRowCommom'

 export function TabListagemInvestimento() {
    return (
        <TableCommom>
            <TableHeaderCommom>
                <TableRowCommom>
                    <TableHeaderCellCommom scope="col">Título</TableHeaderCellCommom>
                    <TableHeaderCellCommom scope="col">Valor</TableHeaderCellCommom>                                
                    <TableHeaderCellCommom scope="col">Corretora</TableHeaderCellCommom>

                </TableRowCommom>
            </TableHeaderCommom>

            <TableBodyCommom>                
                <TableRowCommom backGroundColor='Black'>
                    <TableCellDataCommom key={1} data-label='Pago'> 'Sim' </TableCellDataCommom>
                </TableRowCommom>                                           
            </TableBodyCommom>
        </TableCommom>
    )
}