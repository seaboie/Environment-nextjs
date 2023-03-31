import Image from 'next/image'

export default function HeadLogoImage() {
    return (
        <Image
            src={"../svg/logo.svg"}
            width={32}
            height={32}
            alt="Logo"
            priority
        />
    )
}
