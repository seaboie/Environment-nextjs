'use client'

import firebase_app from '@/firebase/config'
import { FireApi } from '@/firebase/firestore/fireApi'
import { FireApiDataById } from '@/firebase/firestore/fireApiDataById'
import { Table } from '@mui/material'
import { DocumentData, getFirestore, QueryDocumentSnapshot, collection, query, getDocs, orderBy, limit, where, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import ButtonForword from '../../../components/buttonPage/ButtonForword'
import ButtonNext from '../../../components/buttonPage/ButtonNext'
import ButtonPrevious from '../../../components/buttonPage/ButtonPrevious'
import ButtonRevert from '../../../components/buttonPage/ButtonRevert'
import { ModelDevicesIdType, ModelDevicesType } from '../../models/modelTable/modelDevices'
import { tableHeadDevices } from '../../models/modelTableHead/modelTableHead'
import { useAuthContext } from '@/context/AuthContext'
import { UserType } from '@/types/typeUser'
import { AccountType } from '@/types/typeAccount'

export default function DataLists() {

    const router = useRouter();

    const col = 'devices';
    const fieldDocument = 'accountId';
    const order = 'createdAt';
    const des = 'desc';
    const limited = 2;

    const [dataResults, setDataResults] = useState<ModelDevicesIdType[] | null>(null);

    const [page, setPage] = useState(1);

    const [lastQuerySnapshot, setlastQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [firstQuerySnapshot, setFirstQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

    const [isPreviousAppear, setIsPreviousAppear] = useState(false);
    const [isNextAppear, setIsNextAppear] = useState(true);

    const [totalPage, setTotalPage] = useState(0);
    const [allDocuments, setAllDocuments] = useState<number>(1);

    const [allowedStart, setAllowedStart] = useState("");
    const [allowedEnd, setAllowedEnd] = useState("");

    const allowedStartDate = new Date(allowedStart);
    const allowedEndDate = new Date(allowedEnd);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const deviceIdField = 'deviceId';
    const [deviceId, setDeviceId] = useState("");

    const [compareFieldDocument, setCompareFieldDocument] = useState("");

    const { user } = useAuthContext();
    const colUsers = "users";

    const [placeCompany, setPlaceCompany] = useState<AccountType | null>(null);
    const accountId = dataResults !== null ? dataResults[0].accountId : "";
    const colAccounts = "accounts";

    const getAddressForDescriptionField = async() => {
        const db = getFirestore(firebase_app);
        const docRef = doc(db, colAccounts, accountId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const place = docSnapshot.data() as AccountType;

            setPlaceCompany(place);
        } else {
            alert("ไม่พบสถานที่ นะค่ะ")
        }
        
    }

    const getCompanyId = async () => {
        const { dataById } = await FireApiDataById.fetchDataById<UserType>(colUsers, user?.uid ?? "");
        setCompareFieldDocument(dataById.accountId);
        sessionStorage.setItem('accountId', compareFieldDocument);
    }

    const getDateTime = async () => {

        try {
            const db = getFirestore(firebase_app);
            const collectionRef = collection(db, 'inboxes');

            const queryFirst = query(collectionRef, where(deviceIdField, '==', deviceId), limit(1));
            const docFirst = await getDocs(queryFirst);

            if (docFirst.docs.length === 0) {
                alert(`${deviceId} อุปกรณ์นี้ ไม่พบข้อมูลนะค่ะ`);

                return;
            }

            const firstCreated = await docFirst.docs[0].data() as ModelDevicesType;

            const firstTimestamp = firstCreated.createdAt;

            const firstDateString = firstTimestamp.toDate().toISOString().slice(0, 10);

            setAllowedStart(firstDateString)

            const queryLast = query(collectionRef, where(deviceIdField, '==', deviceId), limit(1));
            const docLast = await getDocs(queryLast);
            const lastCreated = await docLast.docs[0].data() as ModelDevicesType;

            const lastTimestamp = lastCreated.createdAt;

            const lastDateString = lastTimestamp.toDate().toISOString().slice(0, 10);

            setAllowedEnd(lastDateString);

        } catch (error) {
            alert(error)
            setPage(1)
        }
    }

    // Event : start date change
    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (deviceId === "") {
            alert("กรุณาเลือกอุปกรณ์ ก่อนนะค่ะ")
            return;
        }

        const date = e.target.value;
        const selectedDateObj = new Date(date);


        if (selectedDateObj.getTime() < allowedStartDate.getTime()) {
            alert(`ข้อมูลวันที่ ในฐานข้อมูล เริ่มต้นจากวันที่ ${formatDate(allowedStart)}`);
            setStartDate('');
        } else if (selectedDateObj.getDate() > allowedEndDate.getDate()) {
            alert(`ข้อมูลวันสุดท้ายที่เลือกได้ ไม่เกิน วันที่ ${formatDate(allowedEnd)}`)
            setStartDate('');
        } else {
            setStartDate(date);

            if (selectedDateObj > new Date(endDate)) {
                alert('วันที่เริ่มต้น มากกว่าวันสุดท้าย ไม่ได้นะค่ะ')
                setEndDate("");
            }
        }

    }

    // Event : end date change
    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (deviceId === "") {
            alert("กรุณาเลือกอุปกรณ์ ก่อนนะค่ะ")
            return;
        }

        const date = e.target.value;
        const selectedDateObj = new Date(date);

        if (selectedDateObj.getTime() < allowedStartDate.getTime()) {
            alert(`ข้อมูลวันที่ ในฐานข้อมูล เริ่มต้นจากวันที่ ${formatDate(allowedStart)} `);
            setEndDate('');
        } else if (selectedDateObj.getDate() > allowedEndDate.getDate()) {
            alert(`ข้อมูลวันสุดท้ายที่เลือกได้ ไม่เกิน วันที่ ${formatDate(allowedEnd)}`)
            setEndDate("");
        } else {
            setEndDate(date);

            if (startDate && selectedDateObj < new Date(startDate)) {
                alert("วันที่สิ้นสุด น้อยกว่า วันเริ่มต้น ไม่ได้ นะค่ะ");
                setEndDate("");
            }
        }

    }


    // 1. Get totlal Count() for get All Page()
    const getTotalPage = async () => {

        const { count } = await FireApiDataById.fetchedTotalCountWhere<number>(col, fieldDocument, compareFieldDocument);

        if (count) {
            const totalPage = Math.ceil(count / limited);
            setTotalPage(totalPage);
        }

    }

    const db = getFirestore(firebase_app);

    // 2. Get data() by limit()
    const getDataById = async () => {

        const collectionRef = collection(db, col);
        const q = query(collectionRef, where(fieldDocument, '==', compareFieldDocument), orderBy(order, des), limit(limited));
        const docSnapshot = await getDocs(q);

        const firstDoc = docSnapshot.docs[0];
        const lastDoc = docSnapshot.docs[docSnapshot.docs.length - 1];

        const datas = docSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as ModelDevicesType }));

        setDataResults(datas);
        setlastQuerySnapshot(lastDoc);
        setFirstQuerySnapshot(firstDoc)

        await getTotalPage();

    }

    const getFirstPage = async () => {
        setPage(1);
        setIsNextAppear(true);
        await getDataById();
    }

    const getLastPage = async () => {
        setPage(totalPage);
        setIsPreviousAppear(true)

        const { datas, error, firstDoc } = await FireApi.fetchedLastPage<ModelDevicesIdType>(col, fieldDocument, compareFieldDocument, order, des, limited, totalPage);

        if (datas) {
            setFirstQuerySnapshot(firstDoc);
            setDataResults(datas);
        } else {
            alert('no data')
        }
    }

    const getNextData = async () => {

        setIsPreviousAppear(true);

        if (totalPage === page) {
            setIsNextAppear(false);
            return;
        }

        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedNextData<ModelDevicesIdType>(col, fieldDocument, compareFieldDocument, order, des, limited, lastQuerySnapshot);

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

        const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedPreviousData<ModelDevicesIdType>(col, fieldDocument, compareFieldDocument, order, des, limited, firstQuerySnapshot);

        setDataResults(datas);
        setlastQuerySnapshot(lastDoc);
        setFirstQuerySnapshot(firstDoc);

        setPage(page - 1);
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = (date.getFullYear() + 543).toString();

        const newDate = `${day}/${month}/${year}`;
        return newDate;
    }

    const handleView = async () => {

        if (endDate !== "" && startDate !== "" && deviceId !== "") {

            sessionStorage.setItem('startDate', startDate)
            sessionStorage.setItem('endDate', endDate)
            router.push(`/dataList/dataChildLists?start=${startDate}&end=${endDate}`);
        } else {
            alert("ไม่ได้เลือก วันที่ เริ่มต้น หรือ วันสิ้นสุด หรือ อุปกรณ์ นะค่ะ")
        }

    }

    useEffect(() => {
        getCompanyId();

        if (compareFieldDocument) {
            getDataById();

        }

        return () => { }
    }, [compareFieldDocument])

    useEffect(() => {
             
        if (accountId) {
            getAddressForDescriptionField();
        }
          
            return () => {}
      }, [accountId])

    useEffect(() => {
        if (deviceId !== "") {
          getDateTime();
        }
      }, [deviceId]);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {

        setDeviceId(e.target.value);
        setEndDate("");
        setStartDate("");

        sessionStorage.setItem('deviceId', e.target.value);

    }


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
                                        // <tr key={device.instrument.serialNumber}>
                                        <tr key={device.id}>

                                            <td className='table-body '>
                                                <div className=' grid place-items-center'>
                                                    <input
                                                        className='w-1h-10 h-10 self-center'
                                                        type="checkbox"
                                                        name={device.id}
                                                        value={device.id}
                                                        checked={deviceId === device.id}
                                                        id={device.id}
                                                        onChange={(e) => onHandleChange(e)}

                                                    />
                                                </div>
                                            </td>

                                            <td className='table-body'>{`${device.instrument.brand} ${device.instrument.model}`}</td>
                                            <td className='table-body'>{device.instrument.serialNumber}</td>
                                            <td className='table-body'>{device.controller.boardName}</td>
                                            <td className='table-body'>{device.controller.imei}</td>
                                            <td className='table-body'>{placeCompany?.place.address}</td>
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
                    <div className='col-span-2 grid grid-cols-3 gap-5 pt-3'>

                        <div className='grid grid-cols-3 h-10'>
                            <div className=''>Start date</div>
                            <input
                                className='col-span-2 border-2 px-2 py-1 rounded border-slate-300 h-8'
                                type="date"
                                min={allowedStart}
                                max={allowedEnd}
                                name="start"
                                id="start"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />

                        </div>
                        <div className='grid grid-cols-3 h-10'>
                            <div className=''>End date</div>
                            <input
                                className='col-span-2 border-2 px-2 py-1 rounded border-slate-300 h-8'
                                type="date"
                                min={allowedStart}
                                max={allowedEnd}
                                name="end"
                                id="end"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                        <div className='grid grid-cols-2'>
                            <div></div>

                            <div>
                                <div></div>

                                <button
                                    className='w-full border-2 py-1 border-black hover:bg-green-800 hover:text-white rounded-lg text-center font-medium'
                                    onClick={() => handleView()}
                                >
                                    View
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
