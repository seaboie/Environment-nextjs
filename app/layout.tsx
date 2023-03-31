"use client"

import '@/styles/globals.css'
import { Roboto } from 'next/font/google'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContextProvider } from '@/context/AuthContext';

const roboto = Roboto({
    weight: ['400', '500', '700', '900'],
    subsets: ['latin'],
    variable: "--font-roboto",
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body className={`${roboto.variable}`}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <AuthContextProvider>
                        {children}
                    </AuthContextProvider>
                    
                </LocalizationProvider>
            </body>
        </html>
    )
}