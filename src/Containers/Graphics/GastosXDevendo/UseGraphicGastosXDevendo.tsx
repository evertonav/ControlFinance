import { useEffect, useState } from "react"
import { TotalExpenses } from "../../../Services/Expense/TotalExpenses"
import { GetFirstDayMonthNow, GetLastDayMonthNow } from "../../../Utils/Date/GetDateToNumber"
import { GetUserLogado } from "../../../Services/Login/Logar"
import { GetRenda } from "../../../Services/Renda/GetRenda"
import { ValueChart } from "../@type/ValueChart"
import { ColorsChartEnum } from "../Enum/ColorsChartEnum"

export default function UseGraphicGastosXDevendo() {
    const [valuesChart, setValuesChart] = useState<Array<ValueChart>>([{id: 0, color: '#4B5320', label: '', value: 0}])

    useEffect(() => {  
        const fetchData = async () => {
          const valueChartTotalExpenses: number = await TotalExpenses(
              GetFirstDayMonthNow(), 
              GetLastDayMonthNow(),
              GetUserLogado())
              
          const valueChartRendaVsTotal: number = GetRenda() - valueChartTotalExpenses
    
          const listValuesChart: Array<ValueChart> = []
          listValuesChart.push(
            {
              id: 0,
              value: 100,
              label: 'Gastos ',
              color: valueChartRendaVsTotal < 0 ? ColorsChartEnum.RED : ColorsChartEnum.GREEN
            },
            {
              id: 1,
              value: 100,
              label: valueChartRendaVsTotal < 0 ? 'Devendo' : 'Sobrando' + ' 0',
              color: ColorsChartEnum.YELLOW
            }
          )
    
          setValuesChart(listValuesChart)
        }      
        
        fetchData()
      }, [])

    return {
        valuesChart
    }
}