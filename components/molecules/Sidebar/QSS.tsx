'use client'
import Image from "next/image"
import menuIcon from '@/public/icons/ep_menu.svg'
import workIcon from '@/public/icons/solar_file-bold.svg'
import logsIcon from '@/public/icons/material-symbols_mail.svg'
import summaryIcon from '@/public/icons/typcn_chart-line.svg'
import atlasIcon from '@/public/icons/atlas.svg'
import anime from 'animejs'
import { useState } from "react"

interface Props {
    worktable: any,
    logstable: any,
    statstable: any,
}

export default function SideBar(props: Props) {
    const [show, setShow] = useState(false)
    function showBar() {
        anime({
            targets: 'hr',
            translate: "0 -15%",
            backgroundColor: '#F24C26',
            easing: 'linear',
            duration: 200
        });

        setShow(!show)
    }

    return (
        <aside className='box-border flex flex-col gap-32 py-10 px-4 h-full z-10 items-center'>
            <button onClick={showBar} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none'>
                <Image src={menuIcon} alt='' />
                {
                    show && (
                        <>
                            Menu
                        </>
                    )
                }
            </button>

            <div className='flex flex-col gap-12 items-start'>
                <button onClick={props.worktable} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none' title='Action Tables'>
                    <Image src={workIcon} alt='' />
                    {
                        show && (
                            <>
                                Files
                            </>
                        )
                    }
                </button>

                <button onClick={props.statstable} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none' title='Summary Tables'>
                    <Image src={summaryIcon} alt='' />
                    {
                        show && (
                            <>
                                Stats
                            </>
                        )
                    }
                </button>

                <button onClick={props.logstable} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none' title='Activity Logs'>
                    <Image src={logsIcon} alt='' />
                    {
                        show && (
                            <>
                                Issues
                            </>
                        )
                    }
                </button>

            </div>
        </aside>
    )
}