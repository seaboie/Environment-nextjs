import React from 'react'
import Image from 'next/image';

type ButtonRevertType = {
    onclick(): void,
    isAppear: boolean
}

export default function ButtonRevert({ onclick, isAppear }: ButtonRevertType) {
    return (
        <button
            className={`${!isAppear && "opacity-20 cursor-default"} `}
            onClick={() => onclick()}>
            <Image
                src={"../svg/tool/revert.svg"}
                width={50}
                height={50}
                alt="Logo"
                priority
                className="w-auto h-full"
                style={{ width: 'auto', height: 'auto' }}
            />
        </button>
    )
}
