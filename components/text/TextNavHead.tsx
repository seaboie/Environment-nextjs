import Link from 'next/link'

type TextNavHeadProps = {
    title: string,
    route: string,
}

export default function TextNavHead({title, route}: TextNavHeadProps) {
  return (
    
        <Link href={route} className='hover:text-slate-400'>
            <div >
                {title}
            </div>
        </Link>
    
  )
}
