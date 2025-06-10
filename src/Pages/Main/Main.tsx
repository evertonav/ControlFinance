import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { TotalExpenses } from '../../Services/Expense/TotalExpenses';
import { GetFirstDayMonthNow, GetLastDayMonthNow } from '../../Utils/Date/GetDateToNumber';
import { GetUserLogado } from '../../Services/Login/Logar';
import { GetRenda } from '../../Services/Renda/GetRenda'
import Container from '../../Components/Container/Container';
import style from './Main.module.css'
import GraphicGastosXDevendo from '../../Containers/Graphics/GastosXDevendo/GraphicGastosXDevendo';



export default function Main() {
  
  
  return (<GraphicGastosXDevendo />)
}