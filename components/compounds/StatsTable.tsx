'use client'

import TableConsole from "../molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
import Image from "next/image"
import DetailsModal from "../molecules/DetailsModal"
import { useState } from "react"
import TablesToggle from "../molecules/TablesToggle"
import AcceptModal from "../molecules/AcceptModal"
import { useUser } from "@auth0/nextjs-auth0/client"
import ActionModal from "../molecules/ActionModal"
import COMActionModal from '@/components/molecules/COMActionModal'
import DBActionModal from '@/components/molecules/DBActionModal'
import PSActionModal from '@/components/molecules/PSActionModal'
import { Notify } from "notiflix"

export type props = {
    content: {
        date: any,
        numberOfFiles: any,
        completed: any,
        pending: any,
        returned: any,
    }[],
    pageno: any,
    viewbutton: any,
}
export default function Table(props: props) {
    const { user, error, isLoading } = useUser();

    const [view, setView] = useState(false)
    const [dbview, setdbView] = useState(false)
    const [psview, setpsView] = useState(false)
    const [comview, setcomView] = useState(false)
    const [rejview, setrejView] = useState(false)
    const [action, setAction] = useState(false)
    const [dbaction, setdbAction] = useState(false)
    const [psaction, setpsAction] = useState(false)
    const [comaction, setcomAction] = useState(false)
    const [accept, setAccept] = useState(false)
    const [dbaccept, setdbAccept] = useState(false)
    const [psaccept, setpsAccept] = useState(false)
    const [comaccept, setcomAccept] = useState(false)
    const [mykey, setMykey] = useState(0)
    const [filenumber, setfilenumber] = useState(0)
    const [dateReceived, setDate] = useState(new Date())


    // console.log(props.content[0].dateAssigned.toString());


    function closeModal() {
        setView(false)
    }

    function cancel() {
        setAccept(false)
    }

    function close() {
        setAction(false)
    }

    function openModal() {
        setView(true)
    }

    if (props.content.length == 0) {
        return (
            <div className="flex flex-col justify-between w-full pb-10" style={{ zIndex: '2' }}>
                <table className="w-full flex flex-col gap-4 h-screen">
                    <th className="flex">
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Date</td>
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Number of Files</td>
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Completed</td>
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Pending</td>
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Returned</td>
                    </th>

                    <tr className="flex w-full h-full items-center justify-center">
                        <span className="text-2xl">Nothing to see here yet. Try other tables</span>
                    </tr>
                </table>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-between w-full pb-10" style={{ zIndex: '2' }}>
                <th className="flex">
                    <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Date</td>
                    <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Number of Files</td>
                    <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Completed</td>
                    <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Pending</td>
                    <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" >Returned</td>
                </th>
                <table className="w-full flex flex-col gap-4 h-screen ">

                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {/* {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))} */}
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.date}</span></td>\
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.numberOfFiles}</span></td>
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.completed}</span></td>
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.pending}</span></td>
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.returned}</span></td>

                        </tr>
                    ))}
                </table>


                <TableConsole no={props.pageno} />
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