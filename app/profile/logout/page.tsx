"use client"

import firebase_app from "@/firebase/config"
import { getAuth, signOut } from "firebase/auth"
import TopNavigationDashboard from "../../../components/top_nav/TopNavigationDashboard"
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const auth = getAuth(firebase_app);

export default function LogoutPage() {

    const router = useRouter();

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                sessionStorage.setItem('deviceId', '');
                sessionStorage.setItem('emailVerified', 'false');
                router.push("/")
            })
    }
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigationDashboard />
            <div className="flex-grow grid place-items-center my-22">

                <div className="text-4xl">ออกจากระบบ</div>

                <div className="w-3/6">
                    <Image
                        src={'../svg/page/logout.svg'}
                        width={300}
                        height={150}
                        alt="Work hard"
                        priority
                        className='w-auto'
                    />
                </div>

                <div className="h-14 w-48 bg-red-600 hover:bg-red-700 my-3 border rounded grid placeitemce text-white" >
                    <button onClick={() => logout()}>ยืนยัน ออกจากระบบ</button>
                </div>

                
            </div>
        </div>

    )
}