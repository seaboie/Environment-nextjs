import { Suspense } from "react"
import TopNav from "../../components/top_nav/TopNav"
import TopNavigationDashboard from "../../components/top_nav/TopNavigationDashboard"
import Loading from "./loading"
import DataView from "./page"

export const metadata = {
    title: 'รายละเอียด ข้อมูล',
    description: 'รายละเอียด',
}

type DataViewLayoutProps = {
    children: React.ReactNode
}

export default function DataViewLayout({children}: DataViewLayoutProps) {
    return (
        <div className="h-screen flex flex-col">
            <TopNavigationDashboard />
            {children}
        </div>
    )
}