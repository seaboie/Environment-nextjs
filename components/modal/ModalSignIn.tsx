"use client"

import React, { FormEvent, FormEventHandler, useState } from 'react'
import Image from 'next/image'
import { FirebaseAuth } from '../../public/firebase/auth/fireAuth'
import { useRouter } from 'next/navigation'
import { User, sendEmailVerification, getAuth } from 'firebase/auth'
import firebase_app from '@/firebase/config'

type ModalSignInProps = {
    isSignIn: boolean,
    isClose(): void
}

export default function ModalSignIn({ isSignIn, isClose }: ModalSignInProps) {

    const auth = getAuth(firebase_app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null);
    const [userLogin, setUserLogin] = useState<User | null>(null);

    const router = useRouter();

    if (!isSignIn) return null

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.id === 'signin') {
            isClose();
        }
    }

    const handleSignIn = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { user, err } = await FirebaseAuth.signin( email, password)

        if (err) {
            setError(err)

            setEmail("")
            setPassword("")
            return
        }

        if (user === null) {
            alert(`ไม่ส่งค่ามานะ`)
            return
        }
        if (user) {
            
            if (user.emailVerified === false) {
                sendEmailVerification(user)
                sessionStorage.setItem('emailVerified', String(user.emailVerified))
                router.push("/profile/verified-email")
            } else {
                sessionStorage.setItem('emailVerified', String(user.emailVerified))
                router.push("/dataList/dataLists")
            }

        }

    }
    return (
        <div className='absolute w-screen h-screen bg-black bg-opacity-40 grid place-items-center'
            id='signin'
            onClick={(e) => closeModal(e)}
        >
            <div className='w-fit h-fit bg-white border-borderModal border-2 shadow-shadowModal px-8 pb-8 pt-14 grid place-items-center'>
                <div className='w-16 h-16 grid place-items-center'>
                    <Image
                        src={"../svg/auth/login.svg"}
                        width={60}
                        height={60}
                        alt="Logo"
                        priority
                        className='w-full h-auto'
                    />
                </div>

                <div className='mb-[75px] mt-6 text-xl font-medium'>Login</div>

                <form onSubmit={handleSignIn}>

                    <div className='grid gap-4'>
                        <div className='w-[320px] h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex '>
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
                                    value={email}
                                    id='email'
                                    placeholder='Email address'
                                    required
                                    className='w-full h-full px-2'
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                />

                            </div>
                        </div>
                        <div className='w-[320px] h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex'>
                            <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                <div className='w-7 h-5 grid place-items-center'>
                                    <Image
                                        src={"../svg/auth/auth_key.svg"}
                                        width={18}
                                        height={20}
                                        alt="Logo"
                                        priority
                                    // className=' h-auto'
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full'>

                                <input
                                    type="password"
                                    name='password'
                                    value={password}
                                    id='password'
                                    placeholder='Password'
                                    required
                                    className='w-full h-full px-2'
                                    onChange={(e) => setPassword(e.target.value.trim())}
                                />

                            </div>
                        </div>


                        <button type='submit' className='w-[320px] h-10 bg-black hover:bg-green-900 rounded-md grid place-items-center'>

                            <div className='text-white text-lg font-medium'>LOG IN</div>

                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
