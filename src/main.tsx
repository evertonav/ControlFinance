import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ReactQueryProvider } from './Providers/ReactQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <ReactQueryProvider>        
        <RouterProvider router={router} />        
      </ReactQueryProvider>
    
  </StrictMode>,
)
