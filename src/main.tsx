import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ReactQueryProvider } from './Providers/ReactQueryProvider.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      
      <ReactQueryProvider> 
        <LocalizationProvider dateAdapter={AdapterDayjs}> 
          <RouterProvider router={router} />        
        </LocalizationProvider>      
      </ReactQueryProvider>
    
  </StrictMode>,
)
