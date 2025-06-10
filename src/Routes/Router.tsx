import { createBrowserRouter } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import CadExpense from '../Pages/CadExpense/CadExpense'
import { Private } from './Private'
import Layout from '../Components/Layout/Layout'
import Main from '../Pages/Main/Main'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />
    },
    { 
      element: <Layout/>,
      children: [
        {
          path: '/cadExpense',
          element: <Private><CadExpense/></Private> 
        },
        {
          path: '/teste',
          element: <Main/>
        }
      ]    
      
    }
  ]
)

export { router }