import React from 'react'
import Image from 'next/image'

type AuthErrorComponentProps = {
    errorMessage: string | null
}

export default function AuthErrorComponent({errorMessage}: AuthErrorComponentProps) {
    return (
        <div className='w-full h-12 p-2 text-red-600 border border-red-500 rounded-md flex item-center gap-3 '>
            <Image
                src={'../svg/auth/exclamation.svg'}
                width={28}
                height={28}
                alt={'Exclamation'}
                priority
                style={{ height: 'auto', width: 'auto' }}

            />
            <div className='self-center'>{errorMessage}</div>
        </div>
    )
}