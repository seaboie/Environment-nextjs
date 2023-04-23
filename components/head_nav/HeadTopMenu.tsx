import TextNavHead from '../text/TextNavHead'

export const headTopMenuDatas = [
    {id: 1,title: "Home", route: "/"},
    {id: 2,title: "Products", route: "/products"},
    {id: 3,title: "Services", route: "/services"},
    {id: 4,title: "Contact", route: "/contact"},
]

export default function HeadTopMenu() {
    return (
        
        <div className='flex text-base gap-8'>
            {
            headTopMenuDatas.map((item) => (
                <TextNavHead key={item.id}
                    title={item.title}
                    route={item.route}
                />
            ))
        }
        </div>

    )
}
