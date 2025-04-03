import { useContext } from "react"
import { ExpenseContext } from "../../Contexts/CRUDExpense"

export default function UseCadExpense() {
      const { 
        expense, 
        update, 
        setExpense, 
        add,
        deletar
      } = useContext(ExpenseContext)

    async function Save() {
        if (expense?.id) {      
            await update()      
          } 
          else {    
            add()      
          }
    }

    function ExecuteDelete(id: string) {
      deletar(id)
    }

    function setDate(value?: Date) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.date = value?.valueOf() ?? new Date().valueOf()
            return newExpense                  
          })
    }

    function setDescription(value: string) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.description = value
            return newExpense                  
          })
    }

    function setValue(value: number) {
        setExpense((expense) => {
        
            if (!expense) {
                return expense
            }
        
            const newExpense = { ...expense }
        
            newExpense.value = value
            return newExpense                  
        })
    }

    function setBePaid(value: boolean) {
        setExpense((expense) => {

            if (!expense) {
              return expense
            }

            const newExpense = { ...expense }

            newExpense.bePaid = value
            return newExpense                  
          })
    }

    return {
        Save,
        setDate,
        setValue,
        setDescription,
        setBePaid,
        expense,    
        ExecuteDelete,
        setExpense,   

    }
}