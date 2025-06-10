import Container from "../../../Components/Container/Container";
import { PieChart } from "@mui/x-charts";
import style from './GraphicGastosXDevendo.module.css'
import UseGraphicGastosXDevendo from "./UseGraphicGastosXDevendo";
import Graphic from "../Graphic";

export default function GraphicGastosXDevendo() { 
    const {valuesChart} = UseGraphicGastosXDevendo()    

    return (
      <>
      <Graphic 
        description="Gastos X Devendo/Sobrando referente a renda"
        values={valuesChart}/>   

         
      </>)
}