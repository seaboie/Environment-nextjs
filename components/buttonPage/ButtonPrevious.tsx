import React from 'react';
import Image from 'next/image';

type ButtonPreviousType = {
    isAppear: boolean,
    onclick(): void
}

export default function ButtonPrevious({isAppear, onclick}: ButtonPreviousType) {
    return (
        <button
            className={`${!isAppear && "opacity-20 cursor-default"} `}
            onClick={() => onclick()}>
            <Image
                src={"../svg/tool/front.svg"}
                width={2}
                height={2}
                alt="Logo"
                priority
                className="w-auto h-full rotate-180"
                style={{}}
            />
        </button>
    )
}
