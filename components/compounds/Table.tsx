'use client'

import TableConsole from "../molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
import Image from "next/image"
import DetailsModal from "../molecules/DetailsModal"
import { useState } from "react"
import TablesToggle from "../molecules/TablesToggle"

interface props {
    actions: any[],
    headers: any[],
    content: {
        dateassigned: any,
        fileamount: any,
        filenumber: any,
        filetitle: any,
        mda: any,
        groupassigned: any,
    }[],
    pageno: any
}
export default function Table(props: props) {
    const [view, setView] = useState(false)
    const [mykey, setMykey] = useState(0) 

    function closeModal() {
        setView(false)
    }

    function openModal (){
        setView(true)
    }

    if (props.content.length == 0) {
        return (
            <div className="flex flex-col justify-between w-full pb-10" style={{ zIndex: '2'}}>
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
            <div className="flex flex-col justify-between w-full pb-10" style={{ zIndex: '2'}}>
                <table className="w-full flex flex-col gap-4 h-screen">
                    <th className="flex">
                        {props.headers.map((clone, i) => (
                            <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" key={i}>{clone}</td>
                        ))}
                    </th>
    
                    {props.content.map((clone, i) => (
                        <tr key={i} className="flex rounded-lg border border-gray-200">
                            {Object.values(clone).map((incepticlone, i) => (
                                <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{incepticlone as []}</span></td>
                            ))}
    
                            <td className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={() => { 
                                setMykey(i)
                                setTimeout(() => {
                                    setView(true)
                                }, 300);
                            }}>
                                View
                                <Image src={eyeIcon} alt="" />
                            </td>
    
                            {
                                view && (
                                    <DetailsModal key={i} date={props.content[mykey].dateassigned} amount={props.content[mykey].fileamount} number={props.content[mykey].filenumber} title={props.content[mykey].filetitle} mda={props.content[mykey].mda} cancel={closeModal} />
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