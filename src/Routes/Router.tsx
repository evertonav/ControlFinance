import { createBrowserRouter } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import CadExpense from '../Pages/CadExpense/CadExpense'
import { Private } from './Private'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/cadExpense',
      element: <Private><CadExpense /></Private> 
    }
  ]
)

export { router }