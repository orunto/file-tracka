'use client'

import Image from "next/image"
import dropIcon from '@/public/icons/gridicons_dropdown.svg'
import bellIcon from '@/public/icons/octicon_bell-16.svg'
import Link from "next/link"
import { useState } from "react"
import Logout from "../atoms/Logout"
import Notifications from "../atoms/Notifications"
interface props {
    username: any,
    user_role: any,
    page: any,
    notification: any[]
}

export default function Header(props: props) {
    const [logout, setLogout] = useState(false)
    const [notifications, setNotifications] = useState(false)
    return (
        <nav className="box-border w-full flex justify-between items-center m-0 px-10 relative">
            <a href="#" className="m-0 text-black text-4xl font-bold">{props.page}</a>

            <div className="flex px-8 py-10 border-2 border-gray-900 gap-6 rounded-lg items-start relative">
                <article className="flex gap-2">
                    <Image onClick={() => setNotifications(!notifications)} className="cursor-pointer" src={bellIcon} alt="" />

                    {
                        notifications && (
                            <Notifications content={props.notification}/>
                        )
                    }

                    <p className="flex flex-col relative">
                        <b className="text-base flex items-center">{props.username}

                            <Image onClick={() => setLogout(!logout)} className="cursor-pointer" src={dropIcon} alt="" />
                        </b>
                        <span className="text-sm">{props.user_role}</span>
                        {
                            logout && (
                                <Logout />
                            )
                        }
                    </p>


                </article>


                {/* <Link href="/api/auth/logout" className="text-red-600 flex items-center">
                    Logout
                    <Image src={logoutIcon} alt=""/>
                </Link> */}
            </div>
        </nav>
    )
}