"use client"

import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, createContext, useState, useEffect } from 'react'


interface AuthContextType {
    user: User | null;
    // login: (email: string, password: string) => Promise<void>;
    // logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    // login: async () => { },
    // logout: async () => { },
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
                    <div>Loading...</div>
                )
                : (
                    children
                )
            }
        </AuthContext.Provider>
    )
}
