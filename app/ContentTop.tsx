"use client"

import { useAuthContext } from '@/context/AuthContext'
import firebase_app from '@/firebase/config';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const db = getFirestore(firebase_app);

export default function ContentTop() {
    const { user } = useAuthContext();

    const [data, setData] = useState<string[]>([]);

    const [err, setErr] = useState<unknown | null>(null);

    const getAllEmailUsers = async() => {
        const datas: string[] = [];
        const userCollection = collection(db, "users");
        const userSnapshot = await getDocs(userCollection);
        const userLists = userSnapshot.docs.map(doc => {
            const d = doc.data()
            datas.push(d.email)

            setData(datas)
        })
    }

    useEffect(() => {

        getAllEmailUsers()

        return () => {

        }
    }, [])

    return (
        <div>
            {
                user?.emailVerified
                    ? (
                        <div className='min-h-fit w-2/3 bg-slate-100 grid place-items-center my-20 mx-auto py-6 rounded-lg'>
                            <div className='text-5xl'>
                                🚀 &#xFEFF; &#xFEFF; {user?.email} &#xFEFF; &#xFEFF; 🎉 🎉 🎉
                            </div>
                            <div className='my-12'>
                                {
                                    data.map(d => (
                                        <div className='my-10'> Email : {d}</div>
                                    ))
                                }
                            </div>

                        </div>
                    )
                    : <></>
            }

        </div>
    )
}
