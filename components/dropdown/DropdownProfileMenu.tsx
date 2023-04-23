import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type DropdownProfileMenuProps = {
    isShow: boolean,
    isClose(): void,
    isClickLink(value: boolean): void
}

export default function DropdownProfileMenu({ isShow, isClose, isClickLink }: DropdownProfileMenuProps) {

    if (!isShow) return null

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    if (!isMenuOpen) {
        isClickLink(false);
        return null;
    }

    const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.id === "dropdown-profile-menu") {
            isClose();
        }
    }

    console.log("Hey" , isShow);
    

    return (

        <div className='absolute w-screen h-screen'
            id='dropdown-profile-menu'
            onClick={(e) => closeMenu(e)}
        >

            <div className='absolute min-w-fit h-fit bg-[#EEEEEE] border top-16 right-12 p-5 rounded-br-md rounded-bl-md'>
                <div className='min-w-90 flex justify-between mb-5'>
                    <div className='text-xl font-medium mr-3'>
                        Envir Monitor
                    </div>
                    <div className='grid place-items-end ml-3'>
                        <Image
                            src={"../svg/logo.svg"}
                            width={32}
                            height={32}
                            alt="Logo"
                            priority
                        />
                    </div>
                </div>
                <div className='pl-2 pr-16 grid gap-3'>
                    <Link href={"/dataList/dataLists"} onClick={() => setIsMenuOpen(false)}>

                        <div className='flex gap-5 place-items-center py-2 px-3 hover:bg-slate-200 hover: rounded'>
                            <div key={1}>
                                <Image
                                    src={"../svg/profile-menu/table-list.svg"}
                                    width={20}
                                    height={20}
                                    alt="Logo"
                                    priority
                                />
                            </div>
                            <div className='text-zinc-500'>รายงาน</div>
                        </div>

                    </Link>
                    <Link href={"/profile/edit-profile"} onClick={() => setIsMenuOpen(false)}>

                        <div className='flex gap-5 place-items-center py-2 px-3 hover:bg-slate-200 hover: rounded'>
                            <div key={1}>
                                <Image
                                    src={"../svg/profile-menu/profile-menu.svg"}
                                    width={20}
                                    height={20}
                                    alt="Logo"
                                    priority
                                />
                            </div>
                            <div className='text-zinc-500'>แก้ไขข้อมูล</div>
                        </div>

                    </Link>

                    <Link href={"/profile/change-password"} onClick={() => setIsMenuOpen(false)}>

                        <div className='flex gap-5 place-items-center py-2 px-3 hover:bg-slate-200 hover:rounded'>
                            <div key={2}>
                                <Image
                                    src={"../svg/profile-menu/key-change.svg"}
                                    width={20}
                                    height={24}
                                    alt="Change password"
                                    priority
                                    style={{ width: 'auto' }}
                                />
                            </div>
                            <div className='text-zinc-500'>เปลี่ยนรหัสผ่าน</div>
                        </div>

                    </Link>
                    <Link href={"/profile/logout"} onClick={() => setIsMenuOpen(false)}>
                        <div className='flex gap-5 place-items-center py-2 px-3 hover:bg-slate-200 hover:rounded'>
                            <div key={3}>
                                <Image
                                    src={"../svg/profile-menu/logout.svg"}
                                    width={20}
                                    height={18}
                                    alt="Logout"
                                    priority
                                />
                            </div>
                            <div className='text-zinc-500'>ออกจากระบบ</div>

                        </div>
                    </Link>

                </div>
            </div>

        </div>

    )
}
