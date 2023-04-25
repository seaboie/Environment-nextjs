'use client'

import React, { useState } from 'react'
import Chart from 'react-apexcharts';

export default function DataGrapLists() {

  const [dataGraphs, setDataGraphs] = useState([
    {
      name: 'Leq,T',
      data: [234, 31, 123, 543, 321],
      
    },
    {
      name: 'LFmin',
      data: [434, 431, 23, 153, 421]
    },
    {
      name: 'LFmax',
      data: [114, 121, 223, 143, 121]
    },
  ])

  
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
              series={dataGraphs}
              options={{
                title: { text: "Level"},
                xaxis: {
                  title: { text: ""},
                  categories: ['11', '12', '13', '14', '15']
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
