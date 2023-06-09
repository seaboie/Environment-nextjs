import TopNav from "../../components/top_nav/TopNav"

export const metadata = {
    title: 'ติดต่อเรา',
    description: 'หน้าติดต่อเรา',
}


export default function ContactPage() {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNav />
            <div className="flex-grow grid place-items-center">
                <div className="text-3xl">ContactPage</div>
            </div>
        </div>
    )
}