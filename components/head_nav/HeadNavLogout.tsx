'use client'

import React from 'react'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function HeadNavLogout() {

    const router = useRouter();

    const auth = getAuth(firebase_app);

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                sessionStorage.setItem('deviceId', '');
                sessionStorage.setItem('emailVerified', 'false');
                router.push("/")
            })
    }
    return (
        <div className='flex justify-center items-center gap-3'>
            <Link href={"/dataList/dataLists"}><div className='cursor-pointer hover:text-slate-400'>หน้าหลัก</div></Link>

            <div className='text-4xl font-light'>|</div>

            <div
                className='cursor-pointer hover:text-slate-400'
                onClick={logout}
            >
                ออกจากระบบ
            </div>
        </div>
    )
}
