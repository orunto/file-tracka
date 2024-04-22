'use client'

import TableConsole from "../molecules/TableConsole"

let header = [`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date Received`, `Status`, ``]
let row = [`Bureau of Information Technology`, `A`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`, `Assigned`]

export default function Table() {
    return (
        <div className="flex flex-col justify-between w-full pb-10">
            <table className="w-full flex flex-col gap-4 h-screen">
                <th className="flex">
                    {header.map((clone, i) => (
                        <td className="flex p-4 justify-start w-full text-gray-500 text-base font-medium" key={i}>{clone}</td>
                    ))}
                </th>

                <tr className="flex rounded-lg border border-gray-200">
                    {row.map((clone, i) => (
                        <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone}</span></td>
                    ))}
                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium">View</td>
                </tr>
                <tr className="flex rounded-lg border border-gray-200">
                    {row.map((clone, i) => (
                        <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone}</span></td>
                    ))}
                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium">View</td>
                </tr>
                <tr className="flex rounded-lg border border-gray-200">
                    {row.map((clone, i) => (
                        <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium" key={i}><span className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden">{clone}</span></td>
                    ))}
                    <td className="flex whitespace-nowrap overflow-hidden p-4 justify-start w-full text-black text-base font-medium">View</td>
                </tr>

            </table>


            <TableConsole />
        </div>
    )
}