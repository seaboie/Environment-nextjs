'use client'

import { FireApi } from '@/firebase/firestore/fireApi'
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore'
import { Table } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ButtonForword from '../../../components/buttonPage/ButtonForword'
import ButtonNext from '../../../components/buttonPage/ButtonNext'
import ButtonPrevious from '../../../components/buttonPage/ButtonPrevious'
import ButtonRevert from '../../../components/buttonPage/ButtonRevert'
import { ModelInboxesType } from '../../models/modelTable/modelInboxes'
import { tableHeadInboxes } from '../../models/modelTableHead/modelTableHead'

export default function DataChildLists() {

  const collection = 'inboxes';
  const orderBy = 'createdAt';
  const desc = 'desc';
  const limited = 5;

  const [dataResults, setDataResults] = useState<ModelInboxesType[] | null>(null);

  const [page, setPage] = useState(1);

  const [lastQuerySnapshot, setlastQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [firstQuerySnapshot, setFirstQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [isPreviousAppear, setIsPreviousAppear] = useState(false);
  const [isNextAppear, setIsNextAppear] = useState(true);

  const [totalPage, setTotalPage] = useState(0);

  const getTotalPage = async() => {
    const {totalPage} = await FireApi.fetchedTotalPage(collection, limited)
      setTotalPage(totalPage);
  }

  const getData = async() => {
    const { datas, error, firstDoc, lastDoc} = await FireApi.fetchedData<ModelInboxesType>('inboxes', 'createdAt', 'desc', limited);

    if (error) {
      alert(error)
      
    } else {
      setDataResults(datas);
      setlastQuerySnapshot(lastDoc);
    }
    
    setDataResults(datas);
  }

  const getFirstPage = async() => {
    setPage(1);
    setIsNextAppear(true);
    await getData();
  }

  const getLastPage = async() => {
    setPage(totalPage);
    setIsPreviousAppear(true)

    const {datas, error, firstDoc, lastDoc} = await FireApi.fetchedLastPage<ModelInboxesType>(collection, orderBy, desc, limited, totalPage);

    setFirstQuerySnapshot(firstDoc);
    setDataResults(datas);
  }

  const getNextData = async() => {
    setIsPreviousAppear(true);

    if (totalPage === page) {
      setIsNextAppear(false);
      return;
    }

    const {datas, error, firstDoc, lastDoc} = await FireApi.fetchedNextData<ModelInboxesType>(collection, orderBy, desc, limited, lastQuerySnapshot);

    if (error) return;

    setDataResults(datas);
    setFirstQuerySnapshot(firstDoc);
    setlastQuerySnapshot(lastDoc);

    setPage(page + 1);
  }

  const getPreviousData = async() => {
    setIsNextAppear(true);

    if (page === 1) {
      setIsPreviousAppear(false);
      return;
    }

    const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedPreviousData<ModelInboxesType>(collection, orderBy, desc, limited, firstQuerySnapshot);

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
                    tableHeadInboxes.map((inbox) => (
                      <th key={inbox.id} className='table-head'>{inbox.title}</th>
                    ))
                  }


                </tr>

              </thead>
              <tbody>

                {
                  dataResults?.map((inbox) => (
                    <tr key={inbox.createdAt.toString()}>
                      <td className='table-body'>{new Date(inbox.createdAt.toDate()).toLocaleDateString('th-TH', {hour: 'numeric', minute: 'numeric', second: 'numeric'})}</td>
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

              <ButtonRevert onclick={() => { getFirstPage() }} />
              <ButtonPrevious onclick={() => { getPreviousData() }} isAppear={isPreviousAppear} />

              <div className="flex gap-1">
                <div>หน้าที่</div>
                <div>{page}</div>
                <div>/</div>
                <div>{totalPage}</div>
              </div>

              <ButtonNext isAppear={isNextAppear} onclick={() => { getNextData()}} />
              <ButtonForword onclick={() => { getLastPage() }} />

            </div>
          </div>
          <div className='col-span-2 grid grid-cols-3 gap-5 my-3 justify-center'>

            <div className='grid grid-cols-3 justify-center'>

            </div>
            <div className='grid grid-cols-3'>

            </div>
            <div className='grid grid-cols-2'>
              <div></div>
              <Link href={"/dataList/dataChildLists"}>
                <div className='w-full border-2 py-1 border-black hover:bg-slate-700 hover:text-white rounded-lg text-center font-medium'>
                  <div>Export</div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
