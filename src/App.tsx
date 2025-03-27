import { createBrowserRouter } from 'react-router-dom'
import style from './App.module.css'
import Menu from './components/Menu/Menu'
import CadExpense from './features/CadExpense/CadExpense'
import Login from './features/Login/Login'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/cad_expense',
      element: <CadExpense />
    }
  ]
)

export { router }

function App() {

  return (
    <div className={style.container}>
      <Menu />

      <div className={style.containerChild}>
        <Login/>
      </div>
      
    </div>  
    
  )
}

export default App
