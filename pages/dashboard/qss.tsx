'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import SideBar from "@/components/molecules/Sidebar/QSS"
import Header from "@/components/molecules/Header"
import Button from "@/components/atoms/Button"
import searchIcon from '@/public/icons/majesticons_search-line.svg'
import Image from "next/image"
import Table from "@/components/compounds/Table/QSS"
import Stats from "@/components/compounds/Table/Stats"
import styles from '@/styles/components.module.scss'
import { useEffect, useState } from "react"
import QSSAction from "@/components/molecules/Sidebar/QSSAction"
import content from '@/lib/dropdown-content.json'

export default function QSS() {
    const { user } = useUser()

    const [table, setTable] = useState(true)
    const [stats, setStats] = useState(false)
    const [issues, setIssues] = useState(false)
    const [action, setAction] = useState(false)
    const [MDAS, setMDAS] = useState<any[]>([])
    const[rows, setRows] = useState<any[]>([])
    const[statrows, setStatRows] = useState<any[]>([])

    function getAssigned () {
        fetch('/api/get/assigned').then(response => response.json()).then((result) => setRows(result))
    }

    function getStats () {
        fetch('/api/get/stats').then(response => response.json()).then((result) => setStatRows(result))
    }


    useEffect(() => {
        const MDASArray = [...content.MDAS.A, ...content.MDAS.B, ...content.MDAS.C, ...content.MDAS.D]

        setMDAS(MDASArray)

        getAssigned()

        getStats()

    }, [table])

    function showTable() {
        setTable(true)
        setStats(false)
        setIssues(false)
    }

    function showStats() {
        setTable(false)
        setStats(true)
        setIssues(false)
    }

    function showIssues() {
        setTable(false)
        setStats(false)
        setIssues(true)
    }

    if (user) {
        if (user.sub == process.env.AUTH0_SUPER) {
            return (
                <main className='box-border flex w-screen h-screen overflow-hidden relative'>
                    <SideBar worktable={showTable} logstable={showIssues} statstable={showStats} />

                    <section className='box-border flex flex-col w-full gap-16 relative h-full overflow-y-scroll'>
                        <Header user_role={`Beta Tester`} username={user.name} page={`QSS`} />

                        <section className='flex flex-col items-end box-border gap-10 p-10'>
                            {
                                table && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <button className="flex items-center justify-center cursor-pointer bg-transparent border-none"><Image src={searchIcon} alt='' /></button>
                                            <Button onclick={() => setAction(true)}>Add New File</Button>
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <Table
                                            actions={[]}
                                            headers={[]}
                                            content={rows}
                                            pageno={undefined}
                                            viewbutton={undefined} dbviewbutton={undefined} psviewbutton={undefined} comviewbutton={undefined} rejviewbutton={undefined} actionbutton={undefined} dbactionbutton={undefined} psactionbutton={undefined} comactionbutton={undefined} acceptbutton={undefined} dbacceptbutton={undefined} psacceptbutton={undefined} comacceptbutton={undefined} filelocation={undefined} finish={undefined} />
                                    </>
                                )
                            }

                            {
                                stats && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <Stats
                                            actions={[]}
                                            headers={[]}
                                            content={statrows}
                                            pageno={undefined}
                                            viewbutton={undefined} dbviewbutton={undefined} psviewbutton={undefined} comviewbutton={undefined} rejviewbutton={undefined} actionbutton={undefined} dbactionbutton={undefined} psactionbutton={undefined} comactionbutton={undefined} acceptbutton={undefined} dbacceptbutton={undefined} psacceptbutton={undefined} comacceptbutton={undefined} filelocation={undefined} finish={undefined} />
                                    </>
                                )
                            }


                            {
                                action && (
                                    <QSSAction cancel={() => setAction(false)} mdas={MDAS}/>
                                )
                            }
                        </section>
                    </section>
                </main>
            )
        }
    }
    return (
        <></>
    )
}