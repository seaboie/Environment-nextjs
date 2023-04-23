import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}



// "use client";

// import Link from 'next/link'
// import DatePickerStart from "../../components/datepicker/DatePickerStart"
// import { getFirestore, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
// import firebase_app from "@/firebase/config";
// import { useEffect, useState } from "react";
// import { InboxType } from "@/types/typeInboxes";
// import { FireApi } from "@/firebase/firestore/fireApi";
// import ButtonRevert from "../../components/buttonPage/ButtonRevert";
// import ButtonPrevious from "../../components/buttonPage/ButtonPrevious";
// import ButtonNext from "../../components/buttonPage/ButtonNext";
// import ButtonForword from "../../components/buttonPage/ButtonForword";
// import { tableHeadTypes } from "../models/modelTable/modelTableHead";

// const db = getFirestore(firebase_app);

// export default function DataView() {

//   const limited = 80

//   const [datas, setDatas] = useState<InboxType[] | null>(null)

//   const [lastQuerySnapshot, setlastQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
//   const [firstQuerySnapshot, setFirstQuerySnapshot] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)

//   const [page, setPage] = useState(1);

//   const [isPreviousAppear, setIsPreviousAppear] = useState(false);
//   const [isNextAppear, setIsNextAppear] = useState(true);

//   const [totalPage, setTotalPage] = useState(0);

//   const getTotalPage = async () => {
//     const { totalPage } = await FireApi.fetchedTotalPage('inboxes', limited);
//     setTotalPage(totalPage)
//   }

//   const getFirstPage = async () => {
//     setPage(1)
//     setIsNextAppear(true);
//     await getData();
//   }

//   const getLastPage = async () => {
//     setPage(totalPage);
//     setIsPreviousAppear(true)

//     const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedLastPage('inboxes', 'createdAt', 'desc', limited, totalPage);

//     setFirstQuerySnapshot(firstDoc);
//     setDatas(datas);
//   }

//   const getData = async () => {

//     const { datas, lastDoc, firstDoc, error } = await FireApi.fetchedData('inboxes', 'createdAt', 'desc', limited)

//     if (error) {
//       // alert("เกิดปัญหาการเชื่อมต่อสัญญาณอินเตอร์เน็ต")
//       alert(error)
//     } else {
//       setDatas(datas)
//       setlastQuerySnapshot(lastDoc)
//     }

//   }

//   const getNexData = async () => {

//     setIsPreviousAppear(true)

//     if (totalPage === page) {
//       setIsNextAppear(false)
//       return;
//     }

//     const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedNextData('inboxes', 'createdAt', 'desc', limited, lastQuerySnapshot);

//     if (error) return;

//     setDatas(datas);
//     setlastQuerySnapshot(lastDoc)
//     setFirstQuerySnapshot(firstDoc)

//     setPage(page + 1)

//   }

//   const getPreviousData = async () => {

//     setIsNextAppear(true);

//     if (page === 1) {
//       setIsPreviousAppear(false)
//       return
//     }

//     const { datas, error, firstDoc, lastDoc } = await FireApi.fetchedPreviousData("inboxes", 'createdAt', 'desc', limited, firstQuerySnapshot)

//     setDatas(datas)
//     setlastQuerySnapshot(lastDoc)
//     setFirstQuerySnapshot(firstDoc)
//     setPage(page - 1)

//   }

//   useEffect(() => {
//     getTotalPage();
//     getData()

//     return () => { }
//   }, [])  

//   return (
//     <div className="h-screen flex flex-col">

//       <div className="flex-grow">


//         <div className="h-1/6 w-11/12 mx-auto">

//           <div className="">
//             <div className="grid grid-cols-3 py-8">

//               <div className="flex gap-4 justify-end place-items-center ">
//                 <div className="text-xl">Start date :</div>
//                 <div>
//                   <DatePickerStart />
//                 </div>
//               </div>

//               <div className="flex gap-4 justify-center place-items-center">
//                 <div className="text-xl">End date :</div>
//                 <div>
//                   <DatePickerStart />
//                 </div>
//               </div>

//               <div className="grid place-items-center">
//                 <Link href={""}>
//                   <div className="w-32 h-8 bg-black hover:bg-green-900 grid place-items-center rounded">
//                     <h1 className="text-white"> View </h1>
//                   </div>
//                 </Link>
//               </div>

//             </div>
//           </div>

//         </div>

//         <div className="overflow-x-auto h-4/6  w-11/12 mx-auto">
//           <div className="max-h-36">

//             <table className="border-spacing-y-3.5 w-full rounded-sm bg-white ">
//               <thead className="sticky top-0 ">
//                 {/* <tr className=""> */}

//                   {
//                     tableHeadTypes.map(table => (
//                       <th key={table.title} className="table-head">{table.title}</th>
//                     ))
//                   }

//                 {/* </tr> */}
//               </thead>
//               <tbody>

//                 {
//                   datas && datas.map((d, index) => (
//                     <tr key={index.toString()} className="hover:bg-slate-200 text-center">
//                       <td className="table-body w-24">{`${new Date(d.createdAt.seconds * 1000).toLocaleDateString('th-TH', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`} </td>
//                       <td className="table-body">{`${d.data["L 5"]}`}</td>
//                       <td className="table-body">{`${d.data.L10}`}</td>
//                       <td className="table-body">{`${d.data.L50}`}</td>
//                       <td className="table-body">{`${d.data.L90}`}</td>
//                       <td className="table-body">{`${d.data.L95}`}</td>
//                       <td className="table-body">{`${d.data.LImax}`}</td>
//                       <td className="table-body">{`${d.data.LImin}`}</td>
//                       <td className="table-body">{`${d.data.LFmax}`}</td>
//                       <td className="table-body">{`${d.data.LFmin}`}</td>
//                       <td className="table-body">{`${d.data.LSmax}`}</td>
//                       <td className="table-body">{`${d.data.LSmin}`}</td>
//                       <td className="table-body">{`${d.data["Leq,T"]}`}</td>
//                       <td className="table-body">{`${d.data.Peak}`}</td>
//                       <td className="table-body w-24">{`${d.data.Responding}`}</td>
//                       <td className="table-body">{`${d.data.SD}`}</td>
//                       <td className="table-body">{`${d.data.SEL}`}</td>
//                       <td className="table-body w-24">{`${d.data.Weighting}`}</td>
//                     </tr>
//                   ))
//                 }

//               </tbody>
//             </table>

//           </div>
//         </div>

//         <div className="w-full h-1/6 mx-auto  grid place-items-center">

//           <div className="w-11/12  h-24 ">
//             <hr />

//             <div className="grid grid-cols-3 ">
//               <div className="flex my-3 place-items-center gap-6">

                

//                 <ButtonRevert onclick={getFirstPage} />
//                 <ButtonPrevious onclick={getPreviousData} isAppear={isPreviousAppear} />

//                 <div className="flex gap-1">
//                   <div>Page</div>
//                   <div>{page}</div>
//                   <div>/</div>
//                   <div>{totalPage}</div>
//                 </div>

//                 <ButtonNext isAppear={isNextAppear} onclick={getNexData} />
//                 <ButtonForword onclick={getLastPage} />

//               </div>

//               <div></div>

//               <div className=" grid justify-items-center">

//                 <Link href={""}>
//                   <div className="w-32 h-8 bg-white hover:bg-blue-600 hover:text-white  my-3  border border-black rounded">
//                     <h1 className="text-black h-full w-full hover:text-white grid place-items-center "> Export </h1>
//                   </div>
//                 </Link>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   )
// }
