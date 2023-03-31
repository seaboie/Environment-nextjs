import TopNavigation from "../../components/top_nav/TopNavigation"

export const metadata = {
    title: 'รายละเอียดสินค้า',
    description: 'หน้า รายละเอียดสินค้า',
}


export default function ProductPage() {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigation />
            <div className="flex-grow grid place-items-center">
                <div className="text-3xl">ProductPage</div>
            </div>
        </div>
    )
}