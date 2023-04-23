"use client"

import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, createContext, useState, useEffect } from 'react'
import Loading from '../../components/loading/Loading';

interface AuthContextType {
    user: User | null;
    
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
   
});

export const useAuthContext = () => useContext(AuthContext);

type AuthContextProviderType = {
    children: React.ReactNode
}

const auth = getAuth(firebase_app);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }

            setLoading(false)
        })
    
      return () => {
        unsubscribe();
      }
    }, [])
    

    return (
        <AuthContext.Provider value={{user}}>
            {
                loading
                ? (
                    
                    <Loading />
                )
                : (
                    children
                )
            }
        </AuthContext.Provider>
    )
}
