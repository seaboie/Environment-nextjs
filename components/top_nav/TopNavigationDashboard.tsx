"use client"

import { useAuthContext } from '@/context/AuthContext';
import { FireApiDataById } from '@/firebase/firestore/fireApiDataById';
import { UserType } from '@/types/typeUser';
import { useEffect, useState } from 'react';
import DropdownProfileMenu from '../dropdown/DropdownProfileMenu';
import HeadNavLogo from '../head_nav/HeadNavLogo'
import HeadNavProfile from '../head_nav/HeadNavProfile'

export default function TopNavigationDashboard() {

  const { user } = useAuthContext();

  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  const [getUser, setGetUser] = useState<UserType | null>(null);
  const collection = "users";

  const getUserById = async () => {
    const { dataById } = await FireApiDataById.fetchDataById<UserType>(collection, user?.uid ?? "");
    sessionStorage.setItem('accountId', dataById.accountId ?? null);
    setGetUser(dataById);

  }

  useEffect(() => {

    getUserById();

    return () => {

    }
  }, [])

  return (
    <div className='sticky top-0 z-50'>
      <DropdownProfileMenu isShow={isShowProfileMenu} isClose={() => setIsShowProfileMenu(false)} isClickLink={(value) => setIsShowProfileMenu(value)} />
      <header className='bg-navBg h-16 grid grid-cols-4 items-center'>
        <div className='col-span-1'>
          <HeadNavLogo />
        </div>

        <div className='col-span-2'></div>

        <div className='col-span-1 grid grid-cols-12'>
          <div className='col-span-10 grid items-center justify-end'>
            <HeadNavProfile
              title={getUser ? getUser?.displayName : ""}
              isShowDropdown={isShowProfileMenu}
              handleClick={() => setIsShowProfileMenu(!isShowProfileMenu)}
            />
          </div>
          <div className='col-span-2'></div>

        </div>

      </header>
    </div>
  )
}
