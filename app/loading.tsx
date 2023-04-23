import React from 'react'
import Image from 'next/image'
import TopNav from '../components/top_nav/TopNav'

export default function DefaultLoading() {
    return (
        <div className=' w-screen h-screen flex flex-col'>
            <TopNav />
            <div className="animate-spin grid place-items-center flex-grow">
                <Image
                    src={"../svg/tool/loading.svg"}
                    width={80}
                    height={80}
                    alt="Logo"
                    priority
                />
            </div>

        </div>
    )
}
