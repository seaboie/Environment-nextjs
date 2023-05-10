'use client'

import firebase_app from '@/firebase/config';
import { AccountType } from '@/types/typeAccount';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'


type DataListsLayoutProps = {
    children: React.ReactNode,
}

const db = getFirestore(firebase_app);

export default function DataListsLayout({ children }: DataListsLayoutProps) {

    const col = "accounts";
    const companyAccountId = sessionStorage.getItem('accountId') ?? "";

    const [data, setData] = useState<AccountType | null>(null);

    const getDataCompanyById = async () => {
        const docRef =  doc(db, col, companyAccountId);
        const docSnapshot = await getDoc(docRef);

        const d = docSnapshot.data() as AccountType;

        setData(d)
    }

    useEffect(() => {

        getDataCompanyById();

        return () => { }
    }, [])

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
