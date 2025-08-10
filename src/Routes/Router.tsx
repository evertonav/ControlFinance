import { createBrowserRouter } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import CadExpense from '../Pages/CadExpense/CadExpense'
import { Private } from './Private'
import Layout from '../Components/Layout/Layout'
import Main from '../Pages/Main/Main'

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <Login />
    },
    { 
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Private><Main/></Private> 
        },
        {
          path: '/cadExpense',
          element: <Private><CadExpense/></Private> 
        }        
      ]    
      
    }
  ]
)

export { router }