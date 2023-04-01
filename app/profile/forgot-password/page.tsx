"use client"

import Image from 'next/image'
import { FormEvent, FormEventHandler, useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { helpersAuthError } from '../../../public/utils/firebase/auth/helperAuthError';
import { useRouter } from 'next/navigation';
import TopNavigation from '../../../components/top_nav/TopNavigation';

export default function ForgotPasswordPage() {

    const auth = getAuth(firebase_app);

    const [email, setEmail] = useState("");

    const router = useRouter();

    const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                router.push('/');
            })
            .catch ((err) => {
                alert(helpersAuthError.authErrorCodeMessage(err.code))
            })
    }

    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigation />
            <div className="flex-grow grid place-items-center">
                <div className="grid gap-5 place-items-center">
                    <div className="text-3xl">ลืมรหัสผ่าน </div>

                    <div className='grid grid-cols-2 '>

                        <div className="m-10 grid place-items-center">
                            <Image
                                src={"../../../svg/page/forgot-password.svg"}
                                width={200}
                                height={250}
                                alt="hey"
                                priority
                                className="h-72 w-auto"
                            />
                        </div>

                        <div className='grid place-items-center'>
                            <form className='grid gap-8' onSubmit={handleForgotPassword}>

                                <div className='text-xl'>กรุณายืนยัน อีเมล์ เพื่อเปลี่ยนรหัสผ่าน</div>

                                <div className='w-[320px] h-9 border-borderTextField border-[1px] rounded-md overflow-hidden  '>
                                    <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                        <div className='w-7 h-5'>
                                            <Image
                                                src={"../svg/auth/auth_email.svg"}
                                                width={60}
                                                height={60}
                                                alt="Logo"
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full h-full'>

                                        <input
                                            type="email"
                                            name='email'
                                            id='email'
                                            placeholder='Email address'
                                            required
                                            className='w-full h-full px-2'
                                            onChange={(e) => setEmail(e.target.value.trim())}
                                        />

                                    </div>
                                </div>

                                <div className="h-12 w-48 bg-red-600 hover:bg-red-700 my-3 border rounded grid placeitemce text-white">
                                    <button type='submit'>เปลี่ยน รหัสผ่าน</button>
                                </div>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
