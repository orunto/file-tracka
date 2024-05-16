'use client'

import TableConsole from "@/components/molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
import Image from "next/image"
import DetailsModal from "@/components/molecules/DetailsModal"
import { useState } from "react"
import TablesToggle from "@/components/molecules/TablesToggle"
import AcceptModal from "@/components/molecules/AcceptModal"
import { useUser } from "@auth0/nextjs-auth0/client"
import ActionModal from "@/components/molecules/ActionModal"
import COMActionModal from '@/components/molecules/COMActionModal'
import DBActionModal from '@/components/molecules/DBActionModal'
import PSActionModal from '@/components/molecules/PSActionModal'
import { Notify } from "notiflix"

export type props = {
    actions: any[],
    headers: any[],
    content: {
        date: any,
        numberOfFiles: any,
        completed: any,
        pending: any,
        returned: any,
    }[],
}
export default function Table(props: props) {

    

    if (props.content.length == 0) {
        return (
            <div className="flex flex-col justify-between w-full pb-10 overflow-x-scroll" style={{ zIndex: '2' }}>
                <table className="w-full flex flex-col h-screen">
                    <th className="flex w-full">
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Day</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Total No</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Completed</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Pending</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Returned</td>
                    </th>

                    {/* <tr className="flex w-full h-full items-center justify-center">
                        <span className="text-2xl">Nothing to see here yet. Try other tables</span>
                    </tr> */}

                    <tr className="flex w-full">
                        <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Day</td>
                        <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Total No</td>
                        <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Completed</td>
                        <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Pending</td>
                        <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Returned</td>
                    </tr>
                </table>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-between w-full pb-10 overflow-x-scroll min-h-32" style={{ zIndex: '2' }}>
                <table className="w-full flex flex-col h-screen ">
                <th className="flex w-full">
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Day</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Total No</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Completed</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Pending</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-full text-black text-base font-semibold">Returned</td>
                    </th>

                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {/* {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))} */}
                            <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.date.substring(0, 10)}</span></td>
                            
                            <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.numberOfFiles}</span></td>
                            <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.completed}</span></td>
                            <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.pending}</span></td>
                            <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.returned}</span></td>
                            
                        </tr>
                    ))}
                </table>

            </div>
        )

    }

}