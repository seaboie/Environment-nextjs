import Image from 'next/image'

type HeadNavProfileProps = {
    title: string | null,
    isShowDropdown: boolean,
    handleClick(): void
}

export default function HeadNavProfile({ title, isShowDropdown, handleClick }: HeadNavProfileProps) {

    return (
        <div className="flex justify-center items-center gap-5">
            <div>
                <Image
                    src={"../svg/profile.svg"}
                    width={20}
                    height={20}
                    alt="Logo"
                    priority
                />
            </div>
            <div className="text-xl font-medium">
                {title}
            </div>
            <div className=''>
                <div className='w-5 h-5 grid place-items-center cursor-pointer' onClick={() => handleClick() }>
                    <Image
                        src={"../svg/caret.svg"}
                        width={18}
                        height={18}
                        alt="Logo"
                        priority
                        className={`${isShowDropdown ? ' animate-pulse rotate-180' : 'animate-pulse rotate-0'} w-full h-auto`}
                    />
                </div>
                
            </div>
        </div>
    )
}
