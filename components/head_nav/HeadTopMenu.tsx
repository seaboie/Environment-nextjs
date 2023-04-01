import TextNavHead from '../text/TextNavHead'

export const headTopMenuDatas = [
    {title: "Home", route: "/"},
    {title: "Products", route: "/products"},
    {title: "Services", route: "/services"},
    {title: "Contact", route: "/contact"},
]

export default function HeadTopMenu() {
    return (
        
        <div className='flex text-base gap-8'>
            {
            headTopMenuDatas.map((item) => (
                <TextNavHead
                    title={item.title}
                    route={item.route}
                />
            ))
        }
        </div>

    )
}
