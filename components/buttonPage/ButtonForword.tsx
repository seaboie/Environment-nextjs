import React from 'react';
import Image from 'next/image';

type ButtonForwordType = {
    onclick(): void,
    isAppear: boolean
}

export default function ButtonForword({ onclick, isAppear }: ButtonForwordType) {
    return (
        <button
            className={`${!isAppear && "opacity-20 cursor-default"} `}
            onClick={() => onclick()}>
            <Image
                src={"../svg/tool/forword.svg"}
                width={14}
                height={12}
                alt="Logo"
                priority
            />
        </button>
    )
}
