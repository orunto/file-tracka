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
            <div className="flex flex-col justify-between w-full pb-10" style={{ zIndex: '2' }}>
                <table className="w-full flex flex-col gap-4 h-screen">
                    <th className="flex">
                        {props.headers.map((clone, i) => (
                            <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" key={i}>{clone}</td>
                        ))}
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
                <table className="w-full flex flex-col gap-4 h-screen ">
                    <th className="flex">
                        {props.headers.map((clone, i) => (
                            <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" key={i}>{clone}</td>
                        ))}
                    </th>

                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {/* {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))} */}
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.mda}</span></td>
                            {
                                clone.assignedGroup && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.assignedGroup}</span></td>

                                )
                            }
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileTitle}</span></td>
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileNumber}</span></td>
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileAmount}</span></td>
                            {
                                clone.dateAssigned && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateAssigned.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.dateAppraised && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateAppraised.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.dateGroupReceived && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateGroupReceived.substring(0, 10)}</span></td>

                                )
                            }

                            {
                                clone.dateDBReceived && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateDBReceived.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.datePSReceived && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.datePSReceived.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.dateCommissonerReceived && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateCommissonerReceived.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.dateDBRecommended && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateDBRecommended.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.datePSRecommended && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.datePSRecommended.substring(0, 10)}</span></td>

                                )
                            }

                            {
                                clone.dateApproved && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateApproved.substring(0, 10)}</span></td>

                                )
                            }

                            {
                                clone.dateReturnedtoRegistry && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.dateReturnedtoRegistry.substring(0, 10)}</span></td>

                                )
                            }
                            {
                                clone.groupDays && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.groupDays}</span></td>

                                )
                            }
                            {
                                clone.fileLocation && (
                                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.fileLocation.substring(0, 10)}</span></td>

                                )
                            }
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" ><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone.actionTaken}</span></td>


                            <td style={{ display: props.viewbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.dbviewbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setdbView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.psviewbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setpsView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.comviewbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setcomView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.rejviewbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setrejView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.acceptbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setAccept(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Accept
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.dbacceptbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setdbAccept(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Accept
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.psacceptbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setpsAccept(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Accept
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.comacceptbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setcomAccept(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Accept
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.actionbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setAction(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Action
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.dbactionbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setdbAction(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Action
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.psactionbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setpsAction(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Action
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.comactionbutton }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setcomAction(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Action
                                <Image src={eyeIcon} alt="" />
                            </td>

                            <td style={{ display: props.finish }} className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => {
                                setMykey(i)
                                setTimeout(() => {
                                    setComplete(true)
                                    setfilenumber(props.content[mykey].fileNumber)
                                }, 300);
                            }}>
                                Complete
                                <Image src={eyeIcon} alt="" />
                            </td>

                            {
                                view && (
                                    <DetailsModal key={i} date={props.content[mykey].dateAssigned?.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={closeModal} />
                                )
                            }

                            {
                                dbview && (
                                    <DetailsModal key={i} date={props.content[mykey].dateDBRecommended?.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={closeModal} />
                                )
                            }

                            {
                                psview && (
                                    <DetailsModal key={i} date={props.content[mykey].datePSRecommended.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={closeModal} />
                                )
                            }

                            {
                                comview && (
                                    <DetailsModal key={i} date={props.content[mykey].dateCommissonerReceived?.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={closeModal} />
                                )
                            }

                            {
                                rejview && (
                                    <DetailsModal key={i} date={props.content[mykey].dateReturnedtoRegistry?.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={closeModal} />
                                )
                            }

                            {
                                accept && (
                                    <AcceptModal key={i} date={props.content[mykey].dateAssigned.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={cancel} action={dothething} />
                                )
                            }

                            {
                                dbaccept && (
                                    <AcceptModal key={i} date={props.content[mykey].dateAppraised.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={cancel} action={dothething} />
                                )
                            }

                            {
                                psaccept && (
                                    <AcceptModal key={i} date={props.content[mykey].dateDBRecommended.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={cancel} action={dothething} />
                                )
                            }

                            {
                                comaccept && (
                                    <AcceptModal key={i} date={props.content[mykey].datePSRecommended.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={cancel} action={dothething} />
                                )
                            }
                            {
                                action && (
                                    <ActionModal filenumber={filenumber} key={i} date={props.content[mykey].dateGroupReceived.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={close} action={dothething} setAction={undefined} actionArray={[]} />
                                )
                            }
                            {
                                dbaction && (
                                    <DBActionModal filenumber={filenumber} key={i} date={props.content[mykey].dateDBReceived.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={close} action={dothething} setAction={undefined} actionArray={[]} />
                                )
                            }

                            {
                                psaction && (
                                    <PSActionModal filenumber={filenumber} key={i} date={props.content[mykey].datePSReceived.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={close} action={dothething} setAction={undefined} actionArray={[]} />
                                )
                            }

                            {
                                comaction && (
                                    <COMActionModal filenumber={filenumber} key={i} date={props.content[mykey].dateCommissonerReceived.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={close} action={dothething} setAction={undefined} actionArray={[]} />
                                )
                            }

{
                                complete && (
                                    <ActionModal filenumber={filenumber} key={i} date={props.content[mykey].dateGroupReceived.substring(0, 10)} amount={props.content[mykey].fileAmount} number={props.content[mykey].fileNumber} title={props.content[mykey].fileTitle} mda={props.content[mykey].mda} cancel={close} action={dothething} setAction={undefined} actionArray={[]} />
                                )
                            }
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