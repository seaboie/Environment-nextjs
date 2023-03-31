import React from 'react'
import Image from 'next/image'

export default function HeaderImage() {
  return (
    <div className='w-screen'>
        <Image 
        src={'/display.png'}
        width={4000}
        height={400}
        alt="Work hard"
        priority
        className='h-auto'
    />
    </div>
  )
}
