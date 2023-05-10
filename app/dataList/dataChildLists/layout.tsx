'use client';

import { FireApiDataChildList } from '@/firebase/firestore/fireApiDataChildList';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ModelDevicesType } from '../../models/modelTable/modelDevices';

type DataChildListsLayoutProps = {
    children: React.ReactNode
}

export default function DataChildListsLayout({ children }: DataChildListsLayoutProps) {

    const [data, setData] = useState<ModelDevicesType | null>(null);

    const deviceId = sessionStorage.getItem('deviceId') ?? "";
    const col = 'devices';

    const getData = async() => {
        const docSnapshot = await FireApiDataChildList.fetchedDocById<ModelDevicesType>(col,deviceId);

        setData(docSnapshot);
        sessionStorage.setItem('deviceName', `${docSnapshot?.instrument.brand} ${docSnapshot?.instrument.model}`);
    }

    useEffect(() => {
    
        getData();
      return () => { }
    }, [])
    

    return (
        <div className=' h-full flex flex-col'>
                <div className='h-[12%] w-full grid grid-cols-3 border-b-2 items-end'>
                    <div className='col-span-1'>
                        {/* <div className="text-2xl pb-2">Scarlet ST-21D #12345678</div> */}
                        <div className="text-2xl pb-2">{`${data?.instrument.brand} ${data?.instrument.model}`}</div>
                    </div>
                    <div className='col-span-2 grid grid-cols-3 gap-5 my-3 justify-center'>
                        <div></div>
                        <div></div>
                        <div className='grid grid-cols-2'>
                            <div></div>
                            <Link href={"/dataList/dataGraphLists"}>
                                <div className='w-full border-2 py-1 bg-black hover:bg-slate-700 text-white rounded-lg text-center'>
                                    <div>Graph</div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className='flex-grow'>
                    {children}
                </div>
        </div>

    )
}
