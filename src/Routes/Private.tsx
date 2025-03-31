import { ReactNode, useEffect, useState } from 'react'
import { auth } from '../Services/FirebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface PrivateProps {
    children: ReactNode
}

export function Private( { children } : PrivateProps ) {
    const [signed, setSigned] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uId: user?.uid,
                    email: user?.email
                }           
                
                localStorage.removeItem('@reactControlFinance')
                localStorage.setItem("@reactControlFinance", JSON.stringify(userData))
                setSigned(true)
            } else {                
                setSigned(false)
            }         
        })

        return () => {
            unsub()
        }

    }, [])

    if (!signed) {        
        return <Navigate to="/"/>
    }

    return (
        <>{children}</>
    )
}