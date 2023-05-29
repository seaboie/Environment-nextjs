'use client'

import { FireApiDataChildList } from '@/firebase/firestore/fireApiDataChildList'
import { DocumentData, QueryDocumentSnapshot, Timestamp } from '@firebase/firestore'
import { Table } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import ButtonForword from '../../../components/buttonPage/ButtonForword'
import ButtonNext from '../../../components/buttonPage/ButtonNext'
import ButtonPrevious from '../../../components/buttonPage/ButtonPrevious'
import ButtonRevert from '../../../components/buttonPage/ButtonRevert'
import { ModelInboxesCSVType, ModelInboxesDataCSVType, ModelInboxesType } from '../../models/modelTable/modelInboxes'
import { tableHeadInboxes } from '../../models/modelTableHead/modelTableHead'

import { CSVLink } from 'react-csv';

export default function DataChildLists() {

  const limited = 2;
  const col = 'inboxes';

  const createdField = 'createdAt';
  const order = 'createdAt';    //
  const desc = 'desc';

  const deviceIdField = 'deviceId';
  const deviceId = sessionStorage.getItem('deviceId') ?? "";

  const [totalPage, setTotalPage] = useState(0);

  const [dataResults, setDataResults] = useState<ModelInboxesType[] | null>(null);
  const [dataCSV, setDataCSV] = useState<ModelInboxesDataCSVType[]>([]);

  const [isPreviousAppear, setIsPreviousAppear] = useState(false);
  const [isNextAppear, setIsNextAppear] = useState(true);

  const [page, setPage] = useState(1);

  const [lastQuerySnapshot, setlastQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [firstQuerySnapshot, setFirstQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);


  const lastDate = new Date(sessionStorage.getItem('endDate') ?? "")
  lastDate.setDate(lastDate.getDate() + 1)
  const lastNewDate = lastDate.toISOString().slice(0, 10);

  const firstTimestamp = Timestamp.fromDate(new Date(sessionStorage.getItem('startDate') ?? "")) ?? "";
  const lastTimestamp = Timestamp.fromDate(new Date(lastNewDate));

  sessionStorage.setItem('firstTimestamp', firstTimestamp.toMillis().toString());
  sessionStorage.setItem('lastTimestamp', lastTimestamp.toMillis().toString());


  const getData = async() => {
    const { datas, error, firstDoc, lastDoc } = await FireApiDataChildList.fetchedData<ModelInboxesType>(col, deviceIdField, deviceId, createdField, desc, limited);

    setDataResults(datas);
    setFirstQuerySnapshot(firstDoc);
    setlastQuerySnapshot(lastDoc);
  }

  const getTotalPage = async () => {

    const {totalPage} = await FireApiDataChildList.fetchedTotalPage(col, deviceIdField, deviceId, createdField, desc, limited)
    setTotalPage(totalPage);
  }

  const getFirstPage = async () => {
    setPage(1);
    setIsNextAppear(true);

    if (page === 1) {
      setIsPreviousAppear(false);
      return;
  }
  
    await getData()
  }

  const getLastPage = async () => {
    setPage(totalPage);
    setIsPreviousAppear(true)

    if (totalPage === page) {
      setIsNextAppear(false);
      return;
  }

    const { datas, error, firstDoc, lastDoc} = await FireApiDataChildList.fetchedLast<ModelInboxesType>(col, deviceIdField, deviceId, createdField, desc, limited, totalPage);

    setFirstQuerySnapshot(firstDoc);
    setDataResults(datas);
  }

  const getNextData = async () => {
    setIsPreviousAppear(true);

    if (totalPage === page) {
      setIsNextAppear(false);
      return;
    }

    const {datas, error, lastDoc, firstDoc} = await FireApiDataChildList.fetchedNextData<ModelInboxesType>(col, deviceIdField, deviceId, createdField, desc, limited, lastQuerySnapshot)

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

    const {datas, error, firstDoc, lastDoc} = await FireApiDataChildList.fetchedPreviousData<ModelInboxesType>(col, deviceIdField, deviceId, createdField, desc, limited, firstQuerySnapshot);

    setDataResults(datas);
    setlastQuerySnapshot(lastDoc);
    setFirstQuerySnapshot(firstDoc);

    setPage(page - 1);
  }

  const handleExportCSV = async () => {

    const { datas, error } = await FireApiDataChildList.fetchedExportCSV<ModelInboxesCSVType>(col, deviceId, order, firstTimestamp, lastTimestamp, order, desc);

    const allData = datas?.map((d) => {
      const updatedData: ModelInboxesDataCSVType = {
        'L 5': 0,
        L10: 0,
        L50: 0,
        L90: 0,
        L95: 0,
        LFmax: 0,
        LFmin: 0,
        LImax: 0,
        LImin: 0,
        LSmax: 0,
        LSmin: 0,
        'Leq,T': 0,
        Peak: 0,
        Responding: '',
        SD: 0,
        SEL: 0,
        Weighting: ''
      };

    for (const key in d.data) {
      updatedData[key] = !isNaN(d.data[key]) ? parseFloat(d.data[key]) : d.data[key];

    }

    console.log('page.tsx : บรรทัดที่ #138' + ' ' + JSON.stringify(updatedData));

      return {
        date: new Date(d.createdAt.toDate()).toLocaleDateString('th-Th', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }),...updatedData};
    });
  
    if (allData) {
      setDataCSV(allData);
    }

    // alert(JSON.stringify(dataCSV))
    
  }

  useEffect(() => {

    getTotalPage();
    getData();
   
    handleExportCSV();

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
                    tableHeadInboxes.map((inbox) => (
                      <th key={inbox.id} className='table-head'>{inbox.title}</th>
                    ))
                  }
                </tr>

              </thead>
              <tbody>

                {
                  dataResults?.map((inbox) => (
                    // allData?.map((inbox) => (
                    <tr key={inbox.createdAt.toString()}>
                      <td className='table-body'>{new Date(inbox.createdAt.toDate()).toLocaleDateString('th-TH', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
                      <td className='table-body'>{inbox.data['L 5']}</td>
                      <td className='table-body'>{inbox.data.L10}</td>
                      <td className='table-body'>{inbox.data.L50}</td>
                      <td className='table-body'>{inbox.data.L90}</td>
                      <td className='table-body'>{inbox.data.L95}</td>
                      <td className='table-body'>{inbox.data.LFmax}</td>
                      <td className='table-body'>{inbox.data.LFmin}</td>
                      <td className='table-body'>{inbox.data.LImax}</td>
                      <td className='table-body'>{inbox.data.LImin}</td>
                      <td className='table-body'>{inbox.data.LSmax}</td>
                      <td className='table-body'>{inbox.data.LSmin}</td>
                      <td className='table-body'>{inbox.data['Leq,T']}</td>
                      <td className='table-body'>{inbox.data.Peak}</td>
                      <td className='table-body'>{inbox.data.Responding}</td>
                      <td className='table-body'>{inbox.data.SD}</td>
                      <td className='table-body'>{inbox.data.SEL}</td>
                      <td className='table-body'>{inbox.data.Weighting}</td>
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

              <ButtonRevert onclick={() => { getFirstPage() }} isAppear={isPreviousAppear} />
              <ButtonPrevious onclick={() => { getPreviousData() }} isAppear={isPreviousAppear} />

              <div className="flex gap-1">
                <div>หน้าที่</div>
                <div>{page}</div>
                <div>/</div>
                <div>{totalPage}</div>
              </div>

              <ButtonNext isAppear={isNextAppear} onclick={() => { getNextData() }} />
              <ButtonForword onclick={() => { getLastPage() }} isAppear={isNextAppear}/>

            </div>
          </div>
          <div className='col-span-2 grid grid-cols-3 gap-5 my-3 justify-center'>

            <div className='grid grid-cols-3 justify-center'>

            </div>
            <div className='grid grid-cols-3'>

            </div>
            <div className='grid grid-cols-2'>
              <div></div>


              <CSVLink
                filename={`${new Date().toLocaleDateString('th-TH', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}.csv`}
                data={dataCSV?.map((d) => d) ?? ""}
              >
                <div
                  onClick={() => handleExportCSV()}
                  className='w-full border-2 py-1 border-black hover:bg-slate-700 hover:text-white rounded-lg text-center font-medium'>
                  <div>Export</div>
                </div>
              </CSVLink>

            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
