import React from 'react'

import Link from 'next/link'

export default function HeadNavLogout() {
    return (
        <div className='flex justify-center items-center gap-3'>
            <Link href={"/dataList/dataLists"}><div className='cursor-pointer hover:text-slate-400'>หน้าหลัก</div></Link>

            <div className='text-4xl font-light'>|</div>

            <Link href={"/profile/logout"}><div className='cursor-pointer hover:text-slate-400'>ออกจากระบบ</div></Link>
        </div>
    )
}
