import TopNavigationDashboard from "../../../components/top_nav/TopNavigationDashboard"

export const metadata = {
    title: 'แก้ไขข้อมูลส่วนตัว',
    description: 'หน้าแก้ไขข้อมูล',
}


export default function EditProfilePage() {
    return (
        <div className="w-screen min-h-screen flex flex-col">
            <TopNavigationDashboard />
            <div className="flex-grow grid place-items-center">
                <div className="text-3xl">EditProfilePage</div>
            </div>
        </div>
    )
}