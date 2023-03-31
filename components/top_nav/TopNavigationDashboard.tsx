"use client"

import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import DropdownProfileMenu from '../dropdown/DropdownProfileMenu';
import HeadNavLogo from '../head_nav/HeadNavLogo'
import HeadNavProfile from '../head_nav/HeadNavProfile'

export default function TopNavigationDashboard() {

  const { user } = useAuthContext();

  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  return (
    <div className='sticky top-0 z-50'>
      <DropdownProfileMenu isShow={isShowProfileMenu} isClose={() => setIsShowProfileMenu(false)} isClickLink={(value) => setIsShowProfileMenu(value)} />
      <header className='bg-navBg h-16 grid grid-cols-3 '>
        <div className='col-span-1 grid grid-cols-12 '>
        <div className='col-span-3'></div>
          <div className='col-span-9 grid justify-start items-center'>
            <HeadNavLogo />
          </div>
          
        </div>

        <div className='col-span-2 grid grid-cols-12'>
          <div className='col-span-11 grid items-center justify-end'>
            <HeadNavProfile
              title={user ? user.email : ""}
              isShowDropdown={isShowProfileMenu}
              handleClick={() => setIsShowProfileMenu(!isShowProfileMenu)}
            />
          </div>
          <div className='col-span-1'></div>

        </div>

      </header>
    </div>
  )
}
