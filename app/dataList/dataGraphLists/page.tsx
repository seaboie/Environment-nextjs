import React from 'react'

export default function DataGrapLists() {
  return (
    <div className='flex flex-col h-full'>

      <div className='flex-grow'>
        <div className='h-[85%] w-full'>
          
          <div className='w-[50%] h-[80%] grid place-items-center mx-auto'>
            <div className='text-6xl'>Graph</div>
          </div>
        </div>


        <div className='h-[15%] w-full border-t-2 grid grid-cols-3'></div>
      </div>

    </div>
  )
}
