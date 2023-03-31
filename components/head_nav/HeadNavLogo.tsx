import HeadLogoImage from './HeadLogoImage'
import TextLogo from './TextLogo'
import Link from 'next/link'

export default function HeadNavLogo() {
    return (
        <Link href={"/"}>
            <div className='flex justify-center  gap-2'>
                <HeadLogoImage />
                <TextLogo />
            </div>
        </Link>
    )
}
