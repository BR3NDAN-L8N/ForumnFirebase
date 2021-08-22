import React, { useContext, useEffect, useState } from 'react'

import { auth } from '../Firebase/firebase'


const AuthContext = React.createContext<any | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any): JSX.Element => {

    const [currentUser, setCurrentUser] = useState<any | null>({})
    const [loading, setLoading] = useState<boolean>(true)

    const signUp = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const login = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logout = () => {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp,
        login,
        logout
    }

    return (
        <AuthContext.Provider
            value={value}>
            {
                !loading && children
            }
        </AuthContext.Provider>
    )
}
