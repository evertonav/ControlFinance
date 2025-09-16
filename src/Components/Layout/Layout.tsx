import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryProvider } from "../../Providers/ReactQueryProvider";

export default function Layout() {
    return (
    <>
        <ReactQueryProvider>
            <Header/>

            {/*<ReactQueryDevtools position="bottom" initialIsOpen={false}/>*/}

            <Outlet/>    
        </ReactQueryProvider>
    </>)
}