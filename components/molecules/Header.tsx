'use client'

import Image from "next/image"
import dropIcon from '@/public/icons/gridicons_dropdown.svg'
import bellIcon from '@/public/icons/octicon_bell-16.svg'
import Link from "next/link"
interface props {
    username: any,
    user_role: any,
    page: any
}

export default function Header(props: props) {
    return (
        <nav className="box-border w-full flex justify-between items-center m-0 px-10">
            <a href="#" className="m-0 text-black text-4xl font-bold">{props.page}</a>

            <div className="flex px-8 py-10 border-2 border-gray-900 gap-6 rounded-lg items-start">
                <article className="flex gap-2">
                    <Image className="cursor-pointer" src={bellIcon} alt="" />

                    <p className="flex flex-col">
                        <b className="text-base flex items-center">{props.username}

                            <Image className="cursor-pointer" src={dropIcon} alt="" />
                        </b>
                        <span className="text-sm">{props.user_role}</span>
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