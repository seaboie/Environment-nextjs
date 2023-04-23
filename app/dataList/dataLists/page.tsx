'use client'

import { FireApi } from '@/firebase/firestore/fireApi'
import { Table } from '@mui/material'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ButtonForword from '../../../components/buttonPage/ButtonForword'
import ButtonNext from '../../../components/buttonPage/ButtonNext'
import ButtonPrevious from '../../../components/buttonPage/ButtonPrevious'
import ButtonRevert from '../../../components/buttonPage/ButtonRevert'
import { ModelDevicesType } from '../../models/modelTable/modelDevices'
import { tableHeadDevices } from '../../models/modelTableHead/modelTableHead'

export default function DataLists() {

    const collection = 'devices';
    const orderBy = 'createdAt';
    const desc = 'desc';
    const limited = 3;

    const [dataResults, setDataResults] = useState<ModelDevicesType[] | null>(null);

    const [page, setPage] = useState(1);

    const [lastQuerySnapshot, setlastQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [firstQuerySnapshot, setFirstQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

    const [isPreviousAppear, setIsPreviousAppear] = useState(false);
    const [isNextAppear, setIsNextAppear] = useState(true);

    const [totalPage, setTotalPage] = useState(0);

    const getTotalPage = async () => {
        const { totalPage } = await FireApi.fetchedTotalPage(collection, limited)
        setTotalPage(totalPage);
    }

    const getData = async () => {
        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedData<ModelDevicesType>(collection, orderBy, desc, limited);

        if (error) {
            alert(error)

        } else {
            setDataResults(datas);
            setlastQuerySnapshot(lastDoc);
        }

        setDataResults(datas);
    }

    const getFirstPage = async () => {
        setPage(1);
        setIsNextAppear(true);
        await getData();
    }

    const getLastPage = async () => {
        setPage(totalPage);
        setIsPreviousAppear(true)

        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedLastPage<ModelDevicesType>(collection, orderBy, desc, limited, totalPage);

        setFirstQuerySnapshot(firstDoc);
        setDataResults(datas);
    }

    const getNextData = async () => {
        setIsPreviousAppear(true);

        if (totalPage === page) {
            setIsNextAppear(false);
            return;
        }

        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedNextData<ModelDevicesType>(collection, orderBy, desc, limited, lastQuerySnapshot);

        if (error) return;

        setDataResults(datas);
        setFirstQuerySnapshot(firstDoc);
        setlastQuerySnapshot(lastDoc);

        setPage(page + 1);
    }

    const getPreviousData = async () => {
        setIsNextAppear(true);

        if (page === 1) {
            setIsPreviousAppear(false);
            return;
        }

        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedPreviousData<ModelDevicesType>(collection, orderBy, desc, limited, firstQuerySnapshot);

        setDataResults(datas);
        setlastQuerySnapshot(lastDoc);
        setFirstQuerySnapshot(firstDoc);

        setPage(page - 1);
    }

    useEffect(() => {

        getTotalPage();
        getData();

        return () => {

        }
    }, [])


    return (
        <div className='flex flex-col h-full'>

            <div className='flex-grow'>
                <div className='h-[85%] w-full grid place-items-center'>

                    <div className='w-full min-h-[80%] max-h-[80%] overflow-x-auto border-5 border-slate-500 '>

                        <Table className='border w-full rounded-sm'>
                            <thead className="sticky top-0 ">
                                <tr>
                                    {
                                        tableHeadDevices.map((device) => (
                                            <th key={device.id} className='table-head'>{device.title}</th>
                                        ))
                                    }


                                </tr>

                            </thead>
                            <tbody>

                                {
                                    dataResults?.map((device) => (
                                        <tr key={device.instrument.serialNumber}>
                                            <td className='table-body'></td>
                                            <td className='table-body'>{`${device.instrument.brand} ${device.instrument.model}`}</td>
                                            <td className='table-body'>{device.instrument.serialNumber}</td>
                                            <td className='table-body'>{device.controller.boardName}</td>
                                            <td className='table-body'>{device.controller.imei}</td>
                                            <td className='table-body'>{device.accountId}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </Table>

                    </div>

                </div>


                <div className='h-[15%] w-full border-t-2 grid grid-cols-3'>
                    <div className='col-span-1'>
                        <div className="flex my-3 place-items-center gap-6">

                            <ButtonRevert onclick={() => { getFirstPage() }} />
                            <ButtonPrevious onclick={() => { getPreviousData() }} isAppear={isPreviousAppear} />

                            <div className="flex gap-1">
                                <div>หน้าที่</div>
                                <div>{page}</div>
                                <div>/</div>
                                <div>{totalPage}</div>
                            </div>

                            <ButtonNext isAppear={isNextAppear} onclick={() => { getNextData() }} />
                            <ButtonForword onclick={() => { getLastPage() }} />

                        </div>
                    </div>
                    <div className='col-span-2 grid grid-cols-3 gap-5 my-3 justify-center'>

                        <div className='grid grid-cols-3 justify-center'>
                            <div>Start date</div>
                            <input
                                className='col-span-2 border-2 px-2 py-1 rounded border-slate-300 h-8'
                                type="date"
                                name="start"
                                id="start" />
                        </div>
                        <div className='grid grid-cols-3'>
                            <div>End date</div>
                            <input
                                className='col-span-2 border-2 px-2 py-1 rounded border-slate-300 h-8'
                                type="date"
                                name="start"
                                id="start" />
                        </div>
                        <div className='grid grid-cols-2'>
                            <div></div>
                            <Link href={"/dataList/dataChildLists"}>
                                <div className='w-full border-2 py-1 border-black hover:bg-green-800 hover:text-white rounded-lg text-center font-medium'>
                                    <div>View</div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
