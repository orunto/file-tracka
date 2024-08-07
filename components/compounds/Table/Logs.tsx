'use client'

import TableConsole from "@/components/molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
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
        dateAccepted: any,
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
        date: any,
        fileName: any,
        action: any,
        user: any,
    }[],
    filelocation: any,
}
export default function Table(props: props) {
    const { user, error, isLoading } = useUser();
    const [mykey, setMykey] = useState(0)
    const [filenumber, setfilenumber] = useState(0)
    const [dateReceived, setDate] = useState(new Date())


    // console.log(props.content[0].dateAssigned.toString());


    async function dothething(e: any) {
        e.preventDefault()


        if (props.filelocation == 'Group') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.filelocation,
                dateGroupReceived: dateReceived,
                dateDBReceived: null,
                dateCommissonerReceived: null,
                datePSReceived: null
            }

            const response = await fetch('/api/accept', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File accepted')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.filelocation == 'DB') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.filelocation,
                dateGroupReceived: null,
                dateDBReceived: dateReceived,
                dateCommissonerReceived: null,
                datePSReceived: null
            }

            const response = await fetch('/api/accept', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File accepted')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.filelocation == 'PS') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.filelocation,
                dateGroupReceived: null,
                dateDBReceived: null,
                dateCommissonerReceived: null,
                datePSReceived: dateReceived
            }

            const response = await fetch('/api/accept', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File accepted')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.filelocation == 'Commissioner') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.filelocation,
                dateGroupReceived: null,
                dateDBReceived: null,
                dateCommissonerReceived: dateReceived,
                datePSReceived: null
            }

            const response = await fetch('/api/accept', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File accepted')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        }

    }

    if (props.content.length == 0) {
        return (
            <div className="flex flex-col justify-between w-full pb-10 overflow-scroll h-screen" style={{ zIndex: '2' }}>
                <table className="w-max flex flex-col h-max">
                    <th className="flex w-max">
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Date</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Name</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Number</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Action</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">User</td>
                        <td className="flex px-8 py-4 justify-start w-max text-transparent text-base font-semibold border-none">More</td>
                    </th>

                    <tr className="flex w-full h-36 items-center justify-center">
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
                            More
                            <Image src={eyeIcon} alt="" />
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
                    <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Date</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Name</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">File Number</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">Action</td>
                        <td style={{ background: '#CAD9D0' }} className=" flex px-8 py-4 justify-start w-72 text-black text-base font-semibold">User</td>
                        <td className="flex px-8 py-4 justify-start w-max text-transparent text-base font-semibold border-none">More</td>
                    </th>

                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {/* {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))} */}
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.date.substring(0, 10)}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileName}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileNumber}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.action}</span></td>
                            <td className="flex px-8 py-4 justify-start w-72 text-black text-base font-semibold"><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.user}</span></td>
                            <td className="flex items-center gap-2 px-8 py-4 justify-start w-max text-green-500 text-base font-semibold cursor-pointer">
                                More
                                <Image src={eyeIcon} alt="" />
                            </td>

                        </tr>
                    ))}
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