import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryCliente = new QueryClient()

interface ReactQueryProviderProps {
    children: ReactNode
}

export function ReactQueryProvider({ children } : ReactQueryProviderProps) {
  return ( 
    <QueryClientProvider client={queryCliente}>
      {children}
    </QueryClientProvider>)
}