"use client"

import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import DropdownProfileMenu from '../dropdown/DropdownProfileMenu';
import HeadNavLogo from '../head_nav/HeadNavLogo'
import HeadNavProfile from '../head_nav/HeadNavProfile'

export default function TopNavigationDashboard() {

  const {user} = useAuthContext();

  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  return (
    <div className='sticky top-0 z-50'>
      <DropdownProfileMenu isShow={isShowProfileMenu} isClose={() => setIsShowProfileMenu(false)} isClickLink={(value) => setIsShowProfileMenu(value)} />
      <header className='bg-navBg h-16 grid grid-cols-4 items-center '>
        <div className='col-span-1'>
          <HeadNavLogo />
        </div>

        <div className='col-span-2'>

        </div>

        <div className='col-span-1'>
          <HeadNavProfile
            title={user ? user.email : ""}
            isShowDropdown={isShowProfileMenu}
            handleClick={() => setIsShowProfileMenu(!isShowProfileMenu)}
          />

        </div>

      </header>
    </div>
  )
}
