'use client'
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import helpIcon from '@/public/icons/white-material-symbols_help.svg'
import supportIcon from '@/public/icons/white-streamline_customer-support-1-solid.svg'
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      if (user.sub == process.env.AUTH0_REG_ID) {
        window.location.assign('/dashboard/registry')
      } else if (user.sub == process.env.AUTH0_GROUPA_ID) {
        window.location.assign('/dashboard/group/A')
      } else if (user.sub == process.env.AUTH0_GROUPB_ID) {
        window.location.assign('/dashboard/group/B')
      } else if (user.sub == process.env.AUTH0_GROUPC_ID) {
        window.location.assign('/dashboard/group/C')
      } else if (user.sub == process.env.AUTH0_GROUPD_ID) {
        window.location.assign('/dashboard/group/D')
      } else if (user.sub == process.env.AUTH0_DIRECTOR_ID) {
        window.location.assign('/dashboard/director-budget')
      } else if (user.sub == process.env.AUTH0_PS_ID) {
        window.location.assign('/dashboard/permanent-secretary')
      } else if (user.sub == process.env.AUTH0_COM_ID) {
        window.location.assign('/dashboard/commissioner')
      }

      
      localStorage.setItem("user", user.sub as string);
      localStorage.setItem("email", user.email as string);

    }
  }, [user])

  return (
    <>
      <nav className="box-border flex justify-between items-center m-0 px-36 py-6">
        <Link href="/" className="m-0 text-green-400 text-4xl font-black">FILE TRACKER</Link>

        <ul className="flex gap-8 items-center m-0">
          <Link href="/" className="flex gap-2 items-center justify-center px-6 py-3 bg-green-700 text-base text-gray-50 rounded">
            <Image src={helpIcon} alt='' />
            Help
          </Link>
          <Link href="/" className="flex gap-2 items-center justify-center px-6 py-3 bg-green-700 text-base text-gray-50 rounded">
            <Image src={supportIcon} alt='' />
            Contact Support
          </Link>
        </ul>
      </nav>
      <main className="flex flex-col items-center gap-10 px-36 mt-20">
        <h1 className="text-center text-7xl font-bold">
          <em className="not-italic text-green-400">File Tracking </em>
          at Your Finger Tips
        </h1>

        <p className="text-xl px-36 text-center">Access file information, status and update actions taken from anywhere and any device</p>

        <Button onclick={() => window.location.assign('/api/auth/login')}>
          Get Started
          <Image src={sendIcon} alt='' />

        </Button>
      </main>
    </>
  )
}
