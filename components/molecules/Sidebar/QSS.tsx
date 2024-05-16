'use client'
import Image from "next/image"
import menuIcon from '@/public/icons/ep_menu.svg'
import anime from 'animejs'
import { useState } from "react"

interface Props {
    worktable: any,
    logstable: any,
    statstable: any,
    icons: {
        tableIcon: any,
        statsIcon: any,
        issuesIcon: any,
    }
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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6667 29.3332H13.3334C8.30535 29.3332 5.79069 29.3332 4.22935 27.7705C2.66669 26.2092 2.66669 23.6945 2.66669 18.6665V13.3332C2.66669 8.30517 2.66669 5.7905 4.22935 4.22917C5.79069 2.6665 8.31869 2.6665 13.3734 2.6665C14.1814 2.6665 14.828 2.6665 15.3734 2.68917C15.356 2.79584 15.3467 2.90384 15.3467 3.0145L15.3334 6.79317C15.3334 8.25584 15.3334 9.54917 15.4734 10.5905C15.6254 11.7198 15.9734 12.8492 16.896 13.7718C17.816 14.6918 18.9467 15.0412 20.076 15.1932C21.1174 15.3332 22.4107 15.3332 23.8734 15.3332H29.276C29.3334 16.0452 29.3334 16.9198 29.3334 18.0838V18.6665C29.3334 23.6945 29.3334 26.2092 27.7707 27.7705C26.2094 29.3332 23.6947 29.3332 18.6667 29.3332Z" fill={props.icons.tableIcon} />
                        <path d="M25.8026 10.1562L20.5226 5.40548C19.02 4.05215 18.2693 3.37482 17.3453 3.02148L17.3333 6.66682C17.3333 9.80948 17.3333 11.3815 18.3093 12.3575C19.2853 13.3335 20.8573 13.3335 24 13.3335H28.7733C28.2906 12.3948 27.424 11.6162 25.8026 10.1562Z" fill="#101010" />
                    </svg>

                    {
                        show && (
                            <>
                                Files
                            </>
                        )
                    }
                </button>

                <button onClick={props.statstable} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none' title='Summary Tables'>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.91669 25.9352C8.60714 26.4873 9.48862 26.7425 10.3672 26.6446C11.2458 26.5468 12.0496 26.104 12.6017 25.4135L17.25 19.6035L21.3334 22.6669C22.0265 23.1864 22.8946 23.4156 23.7539 23.3061C24.6131 23.1966 25.396 22.7569 25.9367 22.0802L32.6034 13.7469C33.1557 13.0564 33.4111 12.1748 33.3134 11.2961C33.2157 10.4173 32.773 9.61335 32.0825 9.06103C31.3921 8.50872 30.5105 8.25331 29.6317 8.35098C28.753 8.44866 27.949 8.89142 27.3967 9.58187L22.7484 15.3919L18.6667 12.3335C17.974 11.8137 17.1061 11.5838 16.2469 11.6927C15.3876 11.8016 14.6045 12.2406 14.0634 12.9169L7.39669 21.2502C6.84485 21.9406 6.58966 22.8219 6.68716 23.7003C6.78466 24.5788 7.22689 25.3826 7.91669 25.9352ZM8.33335 35.0002H31.6667C32.1087 35.0002 32.5326 34.8246 32.8452 34.512C33.1578 34.1995 33.3334 33.7756 33.3334 33.3335C33.3334 32.8915 33.1578 32.4676 32.8452 32.155C32.5326 31.8425 32.1087 31.6669 31.6667 31.6669H8.33335C7.89133 31.6669 7.4674 31.8425 7.15484 32.155C6.84228 32.4676 6.66669 32.8915 6.66669 33.3335C6.66669 33.7756 6.84228 34.1995 7.15484 34.512C7.4674 34.8246 7.89133 35.0002 8.33335 35.0002Z" fill={props.icons.statsIcon} />
                    </svg>

                    {
                        show && (
                            <>
                                Stats
                            </>
                        )
                    }
                </button>

                <button onClick={props.logstable} className='flex text-base gap-2 font-semibold items-center justify-center cursor-pointer bg-transparent border-none' title='Activity Logs'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33335 26.6668C4.60002 26.6668 3.97246 26.4059 3.45069 25.8842C2.92891 25.3624 2.66758 24.7344 2.66669 24.0002V8.00016C2.66669 7.26683 2.92802 6.63927 3.45069 6.1175C3.97335 5.59572 4.60091 5.33438 5.33335 5.3335H26.6667C27.4 5.3335 28.028 5.59483 28.5507 6.1175C29.0734 6.64016 29.3342 7.26772 29.3334 8.00016V24.0002C29.3334 24.7335 29.0725 25.3615 28.5507 25.8842C28.0289 26.4068 27.4009 26.6677 26.6667 26.6668H5.33335ZM16 17.3335L26.6667 10.6668V8.00016L16 14.6668L5.33335 8.00016V10.6668L16 17.3335Z" fill={props.icons.issuesIcon} />
                    </svg>

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