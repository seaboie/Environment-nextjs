'use client'

import { useAuthContext } from '@/context/AuthContext';
import firebase_app from '@/firebase/config';
import { FireApiDataById } from '@/firebase/firestore/fireApiDataById';
import { AccountType } from '@/types/typeAccount';
import { UserType } from '@/types/typeUser';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'


type DataListsLayoutProps = {
    children: React.ReactNode,
}

const db = getFirestore(firebase_app);

export default function DataListsLayout({ children }: DataListsLayoutProps) {

    const { user } = useAuthContext();
    const collection = "users";

    const col = "accounts";
    // const companyAccountId = sessionStorage.getItem('accountId') ?? "";

    const [data, setData] = useState<AccountType | null>(null);
    const [companyAccountId, setCompanyAccountId] = useState("");

    const getUser = async() => {
        const { dataById } = await FireApiDataById.fetchDataById<UserType>(collection, user?.uid ?? "");
        // sessionStorage.setItem('accountId', dataById.accountId);
        setCompanyAccountId(dataById.accountId);
        
    }

    const getDataCompanyById = async () => {
        const docRef =  doc(db, col, companyAccountId);
        const docSnapshot = await getDoc(docRef);

        const d = docSnapshot.data() as AccountType;

        setData(d)
    }   

    useEffect(() => {

        getUser();
        if (companyAccountId) {
            getDataCompanyById();
            
        }


        return () => { }
    }, [companyAccountId])

    return (
        <div className=' h-full flex flex-col'>
            <div className='h-[12%] w-full  grid grid-cols-3 border-b-2 items-end'>
                <div className='col-span-1'>
                    {/* <div className="text-2xl font-medium pb-2">Italthai Public Ltd.</div> */}
                    <div className="text-2xl font-medium pb-2">{data?.company ?? "No"}</div>
                </div>
                <div className='col-span-2 grid grid-cols-3 gap-5 my-3 justify-center'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='flex-grow'>
                {children}
            </div>

        </div>
    )
}
