import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ExpenseProvider from './Contexts/CRUDExpense.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />

      <ExpenseProvider>
        <RouterProvider router={router} />
      </ExpenseProvider>
    
  </StrictMode>,
)
