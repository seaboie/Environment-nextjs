import React from 'react'
import TopNav from '../../components/top_nav/TopNav'
import TopNavigationDashboard from '../../components/top_nav/TopNavigationDashboard'

type DataListLayoutProps = {
    children: React.ReactNode
}

export default function DataListLayout({children}: DataListLayoutProps) {
  return (
    <div className='h-screen w-screen flex flex-col'>
        <TopNavigationDashboard />
        <div className='flex-grow w-10/12 mx-auto'>
            {children}
        </div>
    </div>
  )
}
