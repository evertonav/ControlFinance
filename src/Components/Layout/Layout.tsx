import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Layout() {      
    return (
    <>
        <Header/>

        {import.meta.env.VITE_AMBIENTE === 'LOCAL' 
            && (<ReactQueryDevtools position="bottom" initialIsOpen={false}/>)}

        <Outlet/>    
       
    </>)
}