import TopNav from "../../components/top_nav/TopNav"

export const metadata = {
    title: 'รายละเอียดสินค้า',
    description: 'หน้า รายละเอียดสินค้า',
}


export default function ProductPage() {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNav />
            <div className="flex-grow grid place-items-center">
                <div className="text-3xl">ProductPage</div>
            </div>
        </div>
    )
}