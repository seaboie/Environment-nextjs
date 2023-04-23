"use client"

import { useEffect, useState } from 'react'
import HeadNavLogo from '../head_nav/HeadNavLogo'
import HeadNavLogout from '../head_nav/HeadNavLogout'
import HeadTopMenu from '../head_nav/HeadTopMenu'
import ModalSignIn from '../modal/ModalSignIn'
import ModalSignUp from '../modal/ModalSignUp'

export default function TopNavigation() {

    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [mailVerified, setMailVerified] = useState<string | null>("false");

    useEffect(() => {
        let verified = sessionStorage.getItem('emailVerified')
        setMailVerified(verified);
        // alert(verified)

        return () => {

        }
    }, [])

    return (
        <div className='sticky top-0 z-50'>
            <ModalSignIn isSignIn={isSignIn} isClose={() => setIsSignIn(false)} />
            <ModalSignUp isSignUp={isSignUp} isClose={() => setIsSignUp(false)} isClick={(value) => setIsSignUp(false)} />
            <header className='bg-navBg  h-16 grid grid-cols-4 items-center'>
                <div className='col-span-1'>
                    <HeadNavLogo />
                </div>

                <div className='col-span-2'>
                    <HeadTopMenu />
                </div>

                <div className='col-span-1'>
                    {/* <HeadSignInUp /> */}

                    {
                        mailVerified === "true"
                            ? (
                                <HeadNavLogout />
                            )
                            : (
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='cursor-pointer hover:text-slate-400'
                                        onClick={() => {
                                            setIsSignUp(true)
                                        }}>ลงทะเบียน</div>

                                    <div className='text-4xl font-light'>|</div>

                                    <div className='cursor-pointer hover:text-slate-400'
                                        onClick={() => {
                                            setIsSignIn(true)
                                        }}>เข้าสู่ระบบ</div>
                                </div>
                            )
                    }
                </div>

            </header>
        </div>
    )
}
