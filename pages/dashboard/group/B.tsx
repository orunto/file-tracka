'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import SideBar from "@/components/molecules/Sidebar/Others"
import Header from "@/components/molecules/Header"
import Button from "@/components/atoms/Button"
import searchIcon from '@/public/icons/majesticons_search-line.svg'
import Image from "next/image"
import Table from "@/components/compounds/WorkTable/Assigned"
import Stats from "@/components/compounds/Table/Stats"
import styles from '@/styles/components.module.scss'
import { useEffect, useState } from "react"
import QSSAction from "@/components/molecules/Accept"
import content from '@/lib/dropdown-content.json'
import Issues from "@/components/compounds/Issues/QSS"
import Chart from 'chart.js/auto'
import prisma from "@/lib/prisma"
import Queue from "@/components/compounds/WorkTable/Group"
import Appraised from "@/components/compounds/WorkTable/Appraised"
import Returned from "@/components/compounds/WorkTable/Returned"
import Completed from "@/components/compounds/WorkTable/Completed"
import TablesToggle from "@/components/molecules/TablesToggle"
import Logs from "@/components/compounds/Table/Logs"

export default function Registry() {
    const { user } = useUser()

    const [table, setTable] = useState(true)
    const [work, setWork] = useState(false)
    const [stats, setStats] = useState(false)
    const [issues, setIssues] = useState(false)
    const [logs, setLogs] = useState(false)

    const [action, setAction] = useState(false)
    const [MDAS, setMDAS] = useState<any[]>([])
    const [statrows, setStatRows] = useState<any[]>([])
    const [logrows, setLogRows] = useState<any[]>([])

    // SideBar Shenanigans
    const [tableIcon, setTableIcon] = useState('#101010')
    const [workIcon, setWorkIcon] = useState('#ABAAAA')
    const [statsIcon, setStatsIcon] = useState('#ABAAAA')
    const [issuesIcon, setIssuesIcon] = useState('#ABAAAA')
    const [logsIcon, setLogsIcon] = useState('#ABAAAA')

    // Table
    const [xValues, setXValues] = useState<any[]>([])
    const [yValues, setYValues] = useState<any[]>([])

    const [highest, setHighest] = useState(0)

    const [notifications, setNotifications] = useState<any[]>([])

    // Table Toggle
    const [queue, setQueue] = useState(true)
    const [assigned, setAssigned] = useState(false)
    const [returned, setReturned] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [buttonColor, setButtonColor] = useState("button_one")
    const [line, setLine] = useState("0%")


    const [rows, setRows] = useState<any[]>([])
    function getAssigned() {
        fetch('/api/get/assigned/group/B').then(response => response.json()).then((result) => setRows(result))
    }

    function getAppraised() {
        fetch('/api/get/appraised').then(response => response.json()).then((result) => setRows(result))
    }

    function getQueue() {
        fetch('/api/get/queue/group/B').then(response => response.json()).then((result) => setRows(result))
    }

    function getReturned() {
        fetch('/api/get/returned/registry').then(response => response.json()).then((result) => setRows(result))
    }

    function getCompleted() {
        fetch('/api/get/completed').then(response => response.json()).then((result) => setRows(result))
    }

    function getStats() {
        fetch('/api/get/stats').then(response => response.json()).then((result) => setStatRows(result))
    }

    function getNotifications() {
        fetch('/api/get/notifications/registry').then(response => response.json()).then((result) => setNotifications(result))

    }

    function getLogs() {
        fetch('/api/get/logs/registry').then(response => response.json()).then((result) => setLogRows(result))

    }


    useEffect(() => {
        const size_no: number[] = []
        const y_no: number[] = []
        const MDASArray = [...content.MDAS.A, ...content.MDAS.B, ...content.MDAS.C, ...content.MDAS.D]
        getAssigned()

        setMDAS(MDASArray)

        getNotifications()

        getLogs()

        getStats()

        for (let s = 1; s <= 31; s += 2) {
            size_no.push(s)

            setXValues(size_no)
        }

        setTimeout(() => {
            for (let j = 1; j <= 40; j += 2) {
                y_no.push(j)

                setYValues(y_no)
            }

        }, 200);

        // getNumbers()
    }, [table, stats])

    function showWork() {
        setWork(true)
        setTable(false)
        setStats(false)
        setIssues(false)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')
        setWorkIcon('#101010')
        setLogsIcon('#ABAAAA')
        setLogs(false)
        getQueue()
    }

    function showTable() {
        setTable(true)
        setWork(false)
        setStats(false)
        setIssues(false)
        setLogsIcon('#ABAAAA')
        setWorkIcon('#ABAAAA')
        setLogs(false)
        setTableIcon('#101010')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')
    }

    function showStats() {
        setTable(false)
        setWork(false)
        setStats(true)
        setIssues(false)
        setTableIcon('#ABAAAA')
        setStatsIcon('#101010')
        setIssuesIcon('#ABAAAA')
        setWorkIcon('#ABAAAA')
        setLogsIcon('#ABAAAA')
        setLogs(false)

        setTimeout(() => {
            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Completed',
                        backgroundColor: "#00FFA3",
                        borderColor: "#00FFA3",
                        data: yValues
                    },
                    {
                        label: 'Pending',
                        backgroundColor: "#FFF48C",
                        borderColor: "#FFF48C",
                        data: yValues
                    },
                    {
                        label: 'Returned',
                        backgroundColor: "#FC5555",
                        borderColor: "#FC5555",
                        data: yValues
                    },
                    ]
                },
            });

        }, 100);


    }

    function showIssues() {
        setWork(false)
        setTable(false)
        setStats(false)
        setIssues(true)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setWorkIcon('#ABAAAA')
        setIssuesIcon('#101010')
        setLogsIcon('#ABAAAA')
        setLogs(false)
    }

    function showLogs() {
        setWork(false)
        setTable(false)
        setStats(false)
        setIssues(false)
        setLogs(true)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setWorkIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')
        setLogsIcon('#101010')
        getLogs()
    }


    // Table Toggle

    function showQueue() {
        setQueue(true)
        setAssigned(false)
        setReturned(false)
        setCompleted(false)
        setLine('0%')
        setButtonColor("button_one")
        getQueue()
    }

    function showAppraised() {
        setQueue(false)
        setAssigned(true)
        setReturned(false)
        setCompleted(false)
        setLine('100%')
        setButtonColor("button_two")
        getAppraised()
    }

    function showReturned() {
        setQueue(false)
        setAssigned(false)
        setReturned(true)
        setCompleted(false)
        setLine('200%')
        setButtonColor("button_three")
        getReturned()
    }

    function showCompleted() {
        setQueue(false)
        setAssigned(false)
        setReturned(false)
        setCompleted(true)
        setLine('300%')
        setButtonColor("button_four")
        getCompleted()
    }


    if (user) {
        if (user.sub == process.env.AUTH0_SUPER) {
            return (
                <main className='box-border flex w-screen h-screen overflow-hidden relative'>
                    <SideBar worktable={showWork} logstable={showLogs} statstable={showStats} icons={{
                        tableIcon: tableIcon,
                        statsIcon: statsIcon,
                        issuesIcon: issuesIcon,
                        logsIcon: logsIcon,
                        workIcon: workIcon
                    }} alltable={showTable} issuestable={showIssues} />

                    <section className='box-border flex flex-col w-full gap-16 relative h-full overflow-x-hidden'>
                        <Header user_role={`Beta Tester`} username={user.name} page={`Group B`} notification={notifications} />

                        <section className='flex flex-col items-end box-border h-full gap-10 p-10'>
                            {
                                table && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <button className="flex items-center justify-center cursor-pointer bg-transparent border-none"><Image src={searchIcon} alt='' /></button>
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <Table
                                            actions={[]}
                                            headers={[]}
                                            filelocation={'Group'} content={rows} />
                                    </>
                                )
                            }

                            {
                                work && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <button className="flex items-center justify-center cursor-pointer bg-transparent border-none"><Image src={searchIcon} alt='' /></button>
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <TablesToggle buttoncolor={buttonColor} clickeventone={showQueue} clickeventtwo={showAppraised} clickeventthree={showReturned} clickeventfour={showCompleted} buttonone={`Queue`} buttontwo={`Appraised`} buttonthree={`Returned`} buttonfour={`Completed`} line={line} />


                                        {
                                            queue && (

                                                <Queue
                                                    actions={[]}
                                                    headers={[]}
                                                    filelocation={undefined} content={rows} />
                                            )
                                        }

                                        {
                                            assigned && (

                                                <Appraised
                                                    actions={[]}
                                                    headers={[]}
                                                    filelocation={undefined} content={rows} />
                                            )
                                        }

                                        {
                                            returned && (

                                                <Returned
                                                    actions={[]}
                                                    headers={[]}
                                                    filelocation={undefined} content={rows} />
                                            )
                                        }

                                        {
                                            completed && (

                                                <Completed
                                                    actions={[]}
                                                    headers={[]}
                                                    filelocation={undefined} content={rows} />
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                stats && (
                                    <>
                                        <div className="w-full flex">
                                            <canvas id="myChart" className="w-full h-40"></canvas>

                                        </div>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <Stats actions={[]} headers={[]} content={statrows} />
                                    </>
                                )
                            }

                            {
                                issues && (
                                    <Issues unresolved={[]} review={[]} resolved={[]} />
                                )
                            }

                            {
                                logs && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <Button onclick={undefined}>Download Table</Button>
                                        </div>

                                        <Logs actions={[]} headers={[]} content={logrows} filelocation={undefined} />
                                    </>
                                )
                            }


                            {
                                action && (
                                    <QSSAction cancel={() => setAction(false)} mdas={MDAS} />
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