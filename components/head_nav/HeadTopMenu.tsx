import Link from 'next/link'

export default function HeadTopMenu() {
    return (
        <ul className='flex text-base gap-8  items-center'>
            <Link href={"/"}><li className='hover:text-slate-400 '>Home</li></Link>
            <Link href={"/products"}><li className='hover:text-slate-400 '>Products</li></Link>
            <Link href={"/services"}><li className='hover:text-slate-400 '>Services</li></Link>
            <Link href={"/contact"}><li className='hover:text-slate-400 '>Contact</li></Link>
        </ul>
    )
}
