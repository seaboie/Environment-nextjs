import TopNavigationDashboard from "../../components/top_nav/TopNavigationDashboard"
import Image from 'next/image'
import Link from 'next/link'
import DatePickerStart from "../../components/datepicker/DatePickerStart"

export const metadata = {
  title: 'รายละเอียด',
  description: 'รายละเอียด',
}

export default function DataView() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigationDashboard />
      <div className="flex-grow w-10/12 mx-auto mt-14 mb-28">

        <div>
          <div className="grid grid-cols-3 m-4 ">

            <div className="flex gap-4 justify-end place-items-center ">
              <div className="text-xl">Start date :</div>
              <div>
                  <DatePickerStart />
              </div>
            </div>

            <div className="flex gap-4 justify-center place-items-center">
              <div className="text-xl">End date :</div>
              <div>
                <DatePickerStart />
              </div>
            </div>

            <div className="grid place-items-center">
              <Link href={""}>
                <div className="w-32 h-8 bg-black hover:bg-green-900 grid place-items-center rounded">
                  <h1 className="text-white"> View </h1>
                </div>
              </Link>
            </div>

          </div>
        </div>

        <div className="mb-9"><hr /></div>

        <table className="border-collapse border w-full table-fixed rounded-sm">
          <thead >
            <tr className="">
              <th className="border border-borderTextField p-3 text-left bg-navBg">Datetime</th>
              <th className="border border-borderTextField p-3 text-left bg-navBg">Frequency</th>
              <th className="border border-borderTextField p-3 text-left bg-navBg">Laeq</th>
              <th className="border border-borderTextField p-3 text-left bg-navBg">L05</th>
              <th className="border border-borderTextField p-3 text-left bg-navBg">L10</th>
              <th className="border border-borderTextField p-3 text-left bg-navBg">L95</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">The Sliding Mr. Bones </td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Witchy Woman</td>
              <td className="border border-borderTextField p-3">The Eagles</td>
              <td className="border border-borderTextField p-3">1972</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Shining Star</td>
              <td className="border border-borderTextField p-3">Earth, Wind, and Fire</td>
              <td className="border border-borderTextField p-3">1975</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">The Sliding Mr. Bones </td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Witchy Woman</td>
              <td className="border border-borderTextField p-3">The Eagles</td>
              <td className="border border-borderTextField p-3">1972</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Shining Star</td>
              <td className="border border-borderTextField p-3">Earth, Wind, and Fire</td>
              <td className="border border-borderTextField p-3">1975</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">The Sliding Mr. Bones </td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>

            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Witchy Woman</td>
              <td className="border border-borderTextField p-3">The Eagles</td>
              <td className="border border-borderTextField p-3">1972</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Shining Star</td>
              <td className="border border-borderTextField p-3">Earth, Wind, and Fire</td>
              <td className="border border-borderTextField p-3">1975</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">The Sliding Mr. Bones </td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Witchy Woman</td>
              <td className="border border-borderTextField p-3">The Eagles</td>
              <td className="border border-borderTextField p-3">1972</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">Shining Star</td>
              <td className="border border-borderTextField p-3">Earth, Wind, and Fire</td>
              <td className="border border-borderTextField p-3">1975</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>
            <tr className="hover:bg-slate-200">
              <td className="border border-borderTextField p-3">The Sliding Mr. Bones </td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">Malcolm Lockyer</td>
              <td className="border border-borderTextField p-3">1961</td>
              <td className="border border-borderTextField p-3">1961</td>
            </tr>

          </tbody>
        </table>


      </div>
      <div className="w-full h-24 fixed bottom-0 grid place-items-center bg-white">

        <div className="w-10/12 h-24 fixed bottom-0 ">
          <hr />

          <div className="grid grid-cols-3 ">
            <div className="flex my-3 place-items-center gap-4">

              <div>
                <Image
                  src={"../svg/tool/revert.svg"}
                  width={50}
                  height={50}
                  alt="Logo"
                  priority
                  className="w-auto h-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <div>
                <Image
                  src={"../svg/tool/back.svg"}
                  width={40}
                  height={40}
                  alt="Logo"
                  priority
                  className="w-auto h-full"
                  style={{}}
                />
              </div>
              <div className="flex gap-1">
                <div>Page</div>
                <div>1</div>
                <div>/</div>
                <div>7</div>
              </div>
              <div>
                <Image
                  src={"../svg/tool/front.svg"}
                  width={8}
                  height={8}
                  alt="Logo"
                  priority
                  className="w-full h-auto"
                />
              </div>
              <div>
                <Image
                  src={"../svg/tool/forword.svg"}
                  width={14}
                  height={12}
                  alt="Logo"
                  priority
                // className="h-full w-auto"
                />
              </div>

            </div>

            <div></div>

            <div className=" grid justify-items-center">

              <Link href={""}>
                <div className="w-32 h-8 bg-white hover:bg-blue-600 hover:text-white  my-3  border border-black rounded">
                  <h1 className="text-black h-full w-full hover:text-white grid place-items-center "> Export </h1>
                </div>
              </Link>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
