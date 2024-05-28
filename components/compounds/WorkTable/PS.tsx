'use client'

import TableConsole from "@/components/molecules/TableConsole"
import workIcon from '@/public/icons/mage_pen-fill.svg'
import Image from "next/image"
import DetailsModal from "@/components/molecules/DetailsModal"
import { useEffect, useState } from "react"
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
        dateAssigned: any,
        fileAmount: any,
        fileNumber: any,
        fileTitle: any,
        mda: any,
        assignedGroup: any,
        actionTaken: any,
        dateGroupReceived: any,
        dateCommissonerReceived: any,
        datePSReceived: any,
        dateDBReceived: any,
        dateAppraised: any,
        dateDBRecommended: any,
        datePSRecommended: any,
        dateApproved: any,
        dateReturnedtoRegistry: any,
        fileLocation: any,
        groupDays: any,
        dateAccepted: any,
        psDays: any
    }[],
    filelocation: any,
}
export default function WorkTable(props: props) {
    const { user, error, isLoading } = useUser();
    const [mykey, setMykey] = useState(0)
    const [filenumber, setfilenumber] = useState(0)
    const [dateReceived, setDate] = useState(new Date())

    const [confirm, setConfirm] = useState(false)
    const [date, setFiledate] = useState("")
    const [mda, setmda] = useState("")
    const [amount, setamount] = useState("")
    const [actionTaken, setactiontaken] = useState("")
    const [title, settitle] = useState("")
    const [number, setnumber] = useState("")

    if (props.content.length == 0) {
        return (
            <div className="flex flex-col justify-between w-full pb-10 overflow-scroll h-screen" style={{ zIndex: '2' }}>
                <table className="w-max flex flex-col h-max">
                    <th className="flex w-max">
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">MDA</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Name</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Number</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Amount</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Status</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Location</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-32 text-black text-base font-semibold">Date</td>
                        <td className="flex px-8 py-4 justify-start w-max text-transparent text-base font-semibold border-none">Action</td>
                    </th>

                    <tr className="flex w-full h-screen items-center justify-center">
                        <span className="text-2xl">Nothing to see here yet. Try other tables</span>
                    </tr>

                    {/* <tr className="flex w-max">
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">MDA</td>
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Name</td>
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Number</td>
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Amount</td>
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Status</td>
                        <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Location</td>
                        <td className="flex px-8 py-4 justify-start w-32 text-black text-base font-semibold">Date</td>
                        <td className="flex items-center gap-2 px-8 py-4 justify-start w-max text-green-500 text-base font-semibold cursor-pointer">
                            Action
                            <Image src={workIcon} alt="" />
                        </td>
                    </tr> */}
                </table>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-between w-full pb-10 overflow-scroll h-screen" style={{ zIndex: '2' }}>
                <table className="w-max flex flex-col h-max">
                    <th className="flex w-max">
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">MDA</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Name</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Number</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Amount</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Status</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Location</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-32 text-black text-base font-semibold">Date</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-32 text-black text-base font-semibold">Days</td>
                        <td className="flex px-8 py-4 justify-start w-max text-transparent text-base font-semibold border-none">Action</td>
                    </th>

                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {/* {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))} */}
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.mda}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileTitle}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileNumber}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileAmount}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.actionTaken}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileLocation}</span></td>
                            {
                                clone.datePSReceived && (
                                    <td className="flex px-8 py-4 justify-start w-32 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.datePSReceived.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.psDays && (
                                    <td className="flex px-8 py-4 justify-start w-32 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.psDays}</span></td>

                                )
                            }
                            <td className="flex items-center gap-2 px-8 py-4 justify-start w-max text-green-500 text-base font-semibold cursor-pointer">
                                Action
                                <Image src={workIcon} alt="" />
                            </td>

                        </tr>
                    ))}

                    {
                        
                    }
                </table>
                


                {/* <TableConsole no={props.pageno} /> */}
            </div>
        )

    }

}

{/* <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium">
                            <select name="actions" className="flex whitespace-nowrap overflow-hidden p-0 justify-start border-0 w-full text-black text-base font-medium overflow-ellipsis">
                                <option className="text-base font-medium" value="None" disabled selected>None</option>
                                {
                                    props.actions.map((clone, i) => (
                                        <option value={clone} key={i}>{clone}</option>
                                    ))
                                }
                            </select>
                        </td> */}