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
      } else {
        window.location.assign('/')
      }

      
      localStorage.setItem("user", user.sub as string);
      localStorage.setItem("email", user.email as string);

    }
  }, [user])

  return
}
