import React from 'react'
import TopNav from '../components/top_nav/TopNav'
import ContentTop from './ContentTop'
import HeaderImage from './HeaderImage'

export const metadata = {
  title: 'หนัาแรก',
  description: 'หนัาแรก',
}

export default function Home() {

  return (
    <div>
      <TopNav />
      <HeaderImage />
      <ContentTop />
    </div>
  )
}
