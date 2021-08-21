import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/firebase'


const AuthContext = React.createContext<any | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any): JSX.Element => {

    const [currentUser, currentUserSet] = useState<any | null>({})

    const signUp = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            currentUserSet(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
