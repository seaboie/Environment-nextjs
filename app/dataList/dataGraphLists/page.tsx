'use client'

import { FireApiDataChildList } from '@/firebase/firestore/fireApiDataChildList';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { ModelInboxesType } from '../../models/modelTable/modelInboxes';

export default function DataGrapLists() {

  const firstTimestamp = Timestamp.fromMillis(parseInt(sessionStorage.getItem('firstTimestamp') ?? ""));
  const lastTimestamp = Timestamp.fromMillis(parseInt(sessionStorage.getItem('lastTimestamp') ?? ""));
  const deviceId = sessionStorage.getItem('deviceId') ?? ""

  const col = "inboxes";
  const order = 'createdAt';
  const desc = 'asc';

  const [aData, setAData] = useState<number[]>([]);
  const [bData, setBData] = useState<number[]>([]);
  const [cData, setCData] = useState<number[]>([]);
  const [dateString, setDateString] = useState<string[]>([]);

  const getDataFilterByDate = async () => {
    const { datas, error } = await FireApiDataChildList.fetchedExportCSV<ModelInboxesType>(col, deviceId, order, firstTimestamp, lastTimestamp, order, desc);

    const aD: number[] = [];
    const bD: number[] = [];
    const cD: number[] = [];
    const dateD: string[] = [];

    await datas?.map((data) => {
      aD.push(Number(data.data['Leq,T']))
      bD.push(Number(data.data.LFmin))
      cD.push(parseInt(data.data.LFmax))

      dateD.push(new Date(data.createdAt.toDate()).toLocaleDateString('th-TH', {hour: 'numeric', minute: 'numeric', second: 'numeric'}))
    })


    setAData(aD);
    setBData(bD);
    setCData(cD);

    setDateString(dateD)

  }

  useEffect(() => {

    getDataFilterByDate()

    console.log(cData);
    console.log(aData);
    console.log(bData);

    return () => {

    }
  }, [])

  return (
    <div className='flex flex-col h-full'>

      <div className='flex-grow'>
        <div className='h-[90%] w-full'>

          <div className='w-full h-full grid '>

            <div className='w-full full px-2 pt-10 pb-2'>
              <Chart
                type='line'
                width={"100%"}
                height={"100%"}
                series={[
                  {
                    name: 'Leq,T',
                    data: aData
                  },
                  {
                    name: 'LFmin',
                    data: bData
                  },
                  {
                    name: 'LFmax',
                    data: cData
                  }
                ]}
                options={{
                  title: { text: "Level" },
                  xaxis: {
                    title: { text: "วันเดือนปี - เวลา" },
                    categories: dateString
                  }
                }}
              />

            </div>

          </div>
        </div>

        <div className='h-[10%] w-full grid grid-cols-3'></div>
      </div>

    </div>
  )
}
