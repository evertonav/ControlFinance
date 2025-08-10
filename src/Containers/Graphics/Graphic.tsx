import { PieChart } from "@mui/x-charts";
import Container from "../../Components/Container/Container";
import { ValueChart } from "./@type/ValueChart";
import style from './Graphic.module.css'

interface GraphicProps {
    values: Array<ValueChart>
    description: string
}

export default function Graphic({description, values} : GraphicProps) {
    return (
      <Container className={style.removeMarginTopBottom}>
        <div className={style.titleChart}>
          {description}      
        </div>
  
        <PieChart
          series={[
            {
              data: values,
             // arcLabel: 'value', // Exibe o valor de cada fatia  
              
            },
          ]}
          width={200}
          height={200}          
        />
      </Container>)
}