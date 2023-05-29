import React from 'react';
import Image from 'next/image';

type ButtonNextType = {
    isAppear: boolean,
    onclick(): void
}

export default function ButtonNext({ isAppear, onclick }: ButtonNextType) {
    return (
        <button
            className={`${!isAppear && "opacity-20 cursor-default"}`}
            onClick={() => onclick()}>
            <Image
                src={"../svg/tool/front.svg"}
                width={20}
                height={20}
                alt="Logo"
                priority
                className="w-full h-auto"
            />
        </button>
    )
}
