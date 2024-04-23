'use client'
import toogleIcon from '@/public/icons/toggle.svg'
import Image from 'next/image'
import helpIcon from '@/public/icons/material-symbols_help.svg'
import supportIcon from '@/public/icons/streamline_customer-support-1-solid.svg'

export default function TableConsole() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex self-center gap-4 items-center">
                <span>Page: </span>
                <Image src={toogleIcon} className='cursor-pointer' alt='' />
                <span className="flex items-center justify-center py-3 px-6 bg-green-500 rounded-full text-xl text-gray-50 shadow-md shadow-green-300">1</span>
                <Image src={toogleIcon} alt='' className='cursor-pointer' style={{ transform: 'rotate(180deg)' }} />
                <span>30</span>
            </div>

            <div className="flex items-center justify-self-end gap-8 text-green-500 font-medium">
                <a href="/help" className='flex items-center gap-2'>
                    <Image src={helpIcon} alt='' />
                    Help
                </a>
                <a href="/support" className='flex items-center gap-2'>
                    <Image src={supportIcon} alt='' />
                    Support
                </a>
            </div>
        </div>
    )
}