import React from 'react'

type DataGraphListsLayoutProps = {
    children: React.ReactNode
}

export default function DataGraphListsLayout({ children }: DataGraphListsLayoutProps) {
    return (
        <div className=' h-full flex flex-col'>
                <div className='h-[12%] w-full grid grid-cols-3 border-b-2 items-end'>
                    <div className='col-span-1'>
                        <div className="text-2xl pb-2">Scarlet ST-21D #12345678</div>
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
