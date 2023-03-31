import TopNavigation from "../../components/top_nav/TopNavigation"

export const metadata = {
    title: 'บริการ ของเรา',
    description: 'หน้า บริการของเรา',
}


export default function ServicePage() {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigation />
            <div className="flex-grow grid place-items-center">
                <div className="text-3xl">ServicePage</div>
            </div>
        </div>
    )
}