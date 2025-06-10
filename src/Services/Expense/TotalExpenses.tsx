import { ConvertStringToNumber } from "../../Utils/Date/ConvertNumber";
import { GetExpenses } from "./GetExpenses";

export async function TotalExpenses(dateFirst: Date, dateLast: Date, user: string): Promise<number> {
    return GetExpenses(dateFirst, dateLast, user)
           .then((expenses) => {
             let total: number = 0

              expenses.forEach((valor) => {
                total += ConvertStringToNumber(valor.value) ?? 0;
              });
            
              return total
          }).catch((error) => {        
            console.log('TotalExpenses: ', error)     
            return 0   
          })         
}