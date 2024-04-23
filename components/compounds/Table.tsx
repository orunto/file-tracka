'use client'

import TableConsole from "../molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
import Image from "next/image"
let header = [`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date Received`, `Action Taken`, ``]
let row = [`Bureau of Information Technology`, `A`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`,]

interface props {
    actions: any[],
    headers: any[],
    view: any
}
export default function Table(props: props) {
    return (
        <div className="flex flex-col justify-between w-full pb-10">
            <table className="w-full flex flex-col gap-4 h-screen">
                <th className="flex">
                    {props.headers.map((clone, i) => (
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" key={i}>{clone}</td>
                    ))}
                </th>

                {row.map((clone, i) => (
                    <tr key={i} className="flex rounded-lg border border-gray-200">
                        {row.map((clone, i) => (
                            <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone}</span></td>
                        ))}
                        <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium">
                            <select name="actions" className="flex whitespace-nowrap overflow-hidden p-0 justify-start border-0 w-full text-black text-base font-medium overflow-ellipsis">
                                <option className="text-base font-medium" value="None" disabled selected>None</option>
                                {
                                    props.actions.map((clone, i) => (
                                        <option value={clone} key={i}>{clone}</option>
                                    ))
                                }
                            </select>
                        </td>



                        <td className="flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden p-4 justify-start w-full text-green-500 text-base font-medium" onClick={props.view}>
                            View
                            <Image src={eyeIcon} alt="" />
                        </td>
                    </tr>
                ))}

            </table>


            <TableConsole />
        </div>
    )
}