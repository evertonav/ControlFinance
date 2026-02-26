 import { TableBodyCommom } from '../../../../Components/Grid/TableBodyCommom'
import { TableCellDataCommom } from '../../../../Components/Grid/TableCellDataCommom'
import { TableCommom } from '../../../../Components/Grid/TableCommom'
import { TableHeaderCellCommom } from '../../../../Components/Grid/TableHeaderCellCommom'
import { TableHeaderCommom } from '../../../../Components/Grid/TableHeaderCommom'
import { TableRowCommom } from '../../../../Components/Grid/TableRowCommom'
import ShowIcon from '../../../../Components/ShowIcon/ShowIcon'
import { EntityInvestimento } from '../../../../Services/Investimento/@Types'
import { ConverterDataParaPadraoVisual } from '../../../../Utils/Date/ConvertDate'
import { Corretoras, CorretorasDescricao } from '../CadInvestimento/Enum/CorretorasEnum'
import style from './ListagemInvestimento.module.css'

interface ListagemInvestimentoProps {
    investimentos: Array<EntityInvestimento>
    onDelete: (value: EntityInvestimento) => void
}

export function ListagemInvestimento({investimentos, onDelete} : ListagemInvestimentoProps) {
    
    return (
        <TableCommom>
            <TableHeaderCommom>
                <TableRowCommom>
                    <TableHeaderCellCommom key={'1'} scope="col">Título</TableHeaderCellCommom>
                    <TableHeaderCellCommom key={'2'} scope="col">Valor</TableHeaderCellCommom>                                
                    <TableHeaderCellCommom key={'3'} scope="col">Data Final</TableHeaderCellCommom>    
                    <TableHeaderCellCommom key={'4'} scope="col">Corretora</TableHeaderCellCommom>
                    <TableHeaderCellCommom key={'5'} scope="col"></TableHeaderCellCommom>

                </TableRowCommom>
            </TableHeaderCommom>

            <TableBodyCommom>         
                {investimentos.map((item, index) => {
                    return (
                        <TableRowCommom backGroundColor='Black'>
                            <TableCellDataCommom key={`Titulo_${index}`} data-label='Título'> {item.title} </TableCellDataCommom>
                            <TableCellDataCommom key={`Valor_${index}`} data-label='Valor'> {item.value} </TableCellDataCommom>
                            <TableCellDataCommom key={`DateFinish_${index}`} data-label='Data Final'> {ConverterDataParaPadraoVisual(new Date(item.dateFim))} </TableCellDataCommom>
                            <TableCellDataCommom key={`Corretora_${index}`} data-label='Corretora'> {item.idCorretora ? CorretorasDescricao[item.idCorretora as Corretoras] : 'Sem Corretora'} </TableCellDataCommom>
                            <TableCellDataCommom key={`Delete_${index}`} data-label=''> 
                                <ShowIcon 
                                    nameIcon="delete"
                                    className={`${style.colorDeletar} ${style.mousePointer}`}
                                    onClick={() => {
                                        onDelete(item)
                                    }}/>

                            </TableCellDataCommom>
                        </TableRowCommom>  
                    )
                })}       
                                                         
            </TableBodyCommom>
        </TableCommom>
    )
}