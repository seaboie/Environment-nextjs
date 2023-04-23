import Link from 'next/link'
import React, { ReactNode, Suspense } from 'react'

export const metadata = {
    title: "รายละเอียด ข้อมูล บริษัทต่างๆ",
    description: "รายละเอียด ข้อมูล บริษัทต่างๆ "
}

type DataListsLayoutProps = {
    children: React.ReactNode,
}

export default function DataListsLayout({ children }: DataListsLayoutProps) {
    return (
        <div className=' h-full flex flex-col'>
            <div className='h-[12%] w-full  grid grid-cols-3 border-b-2 items-end'>
                <div className='col-span-1'>
                    <div className="text-2xl font-medium pb-2">Italthai Public Ltd.</div>
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
