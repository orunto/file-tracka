'use client'
import Image from "next/image"
import menuIcon from '@/public/icons/ion_menu-outline.svg'
import workIcon from '@/public/icons/material-symbols_work.svg'
import logsIcon from '@/public/icons/ep_files.svg'
import summaryIcon from '@/public/icons/uis_chart.svg'
import atlasIcon from '@/public/icons/atlas.svg'

interface Props {
    worktable: any,
    logstable: any,
    statstable: any,
    atlas: any,
    atlasbutton: any
}

export default function SideBar( props: Props ) {
    return (
        <aside className='flex flex-col gap-32 p-4 bg-green-100 fixed h-full z-10'>
            <button className='flex items-center justify-center cursor-pointer bg-green-500 border-none'>
                <Image src={menuIcon} alt='' />

            </button>

            <div className='flex flex-col gap-12 items-center'>
                <button onClick={props.worktable} className='flex items-center justify-center cursor-pointer bg-transparent border-none' title='Action Tables'>
                    <Image src={workIcon} alt='' />

                </button>

                <button style={{ display: props.atlas }} onClick={props.atlasbutton} className='flex items-center justify-center cursor-pointer bg-transparent border-none' title='Action Tables'>
                    <Image src={atlasIcon} alt='' />

                </button>

                <button onClick={props.logstable} className='flex items-center justify-center cursor-pointer bg-transparent border-none' title='Activity Logs'>
                    <Image src={logsIcon} alt='' />

                </button>

                <button onClick={props.statstable} className='flex items-center justify-center cursor-pointer bg-transparent border-none' title='Summary Tables'>
                    <Image src={summaryIcon} alt='' />

                </button>
            </div>
        </aside>
    )
}