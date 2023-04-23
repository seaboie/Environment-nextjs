import React from 'react';
import Image from 'next/image';

type ButtonForwordType = {
    onclick(): void
}

export default function ButtonForword({ onclick }: ButtonForwordType) {
    return (
        <button
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
