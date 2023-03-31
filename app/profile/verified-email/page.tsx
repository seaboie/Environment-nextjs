"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";
import Image from 'next/image'
import TopNavigationDashboard from "../../../components/top_nav/TopNavigationDashboard";
import TopNavigation from "../../../components/top_nav/TopNavigation";

export default function VerifiedPage() {
    const router = useRouter();

    useEffect(() => {

        setTimeout(() => {
            router.replace("/");
        }, 10000);

        return () => {

        }
    }, [])

    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigation />
            <div className="flex-grow grid place-items-center">
                <div className="grid gap-5 place-items-center">
                    <div className="text-3xl">Please 🥺 🥺 🥺 Verified your Email </div>
                    <div className="m-10">
                        <Image
                            src={"../../../svg/page/verified.svg"}
                            width={200}
                            height={250}
                            alt="hey"
                            priority
                            className="h-72 w-auto"
                        />
                    </div>

                    <div className="text-xl">กรุณา เข้าไปยืนยัน Email ของท่าน</div>
                    <div className="text-xl">แล้วทำการ ล็อกอิน เพื่อเข้าสู่ระบบ</div>
                </div>
            </div>
        </div>
    )
}