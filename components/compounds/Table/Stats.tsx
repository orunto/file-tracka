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
    pageno: any,
    viewbutton: any,
    dbviewbutton: any,
    psviewbutton: any,
    comviewbutton: any,
    rejviewbutton: any,
    actionbutton: any,
    dbactionbutton: any,
    psactionbutton: any,
    comactionbutton: any,
    acceptbutton: any,
    dbacceptbutton: any,
    psacceptbutton: any,
    comacceptbutton: any,
    filelocation: any,
    finish: any
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
    const [complete, setComplete] = useState(false)
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
            <div className="flex flex-col justify-between w-full pb-10 overflow-x-scroll" style={{ zIndex: '2' }}>
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


                <TableConsole no={props.pageno} />
            </div>
        )

    }

}

{/* <td className="flex px-8 py-4 justify-start w-full text-black text-base font-semibold"
                            <select name="actions" className="flex whitespace-nowrap overflow-hidden p-0 justify-start border-0 w-full text-black text-base font-medium overflow-ellipsis">
                                <option className="text-base font-medium" value="None" disabled selected>None</option>
                                {
                                    props.actions.map((clone, i) => (
                                        <option value={clone} key={i}>{clone}</option>
                                    ))
                                }
                            </select>
                        </td> */}