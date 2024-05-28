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
import QSSAction from "@/components/molecules/Accept"
import content from '@/lib/dropdown-content.json'
import Issues from "@/components/compounds/Issues/QSS"
import Chart from 'chart.js/auto'
import * as XLSX from 'xlsx';
import Logs from "@/components/compounds/Table/Logs"

export default function QSS() {
    const { user } = useUser()

    const [table, setTable] = useState(true)
    const [stats, setStats] = useState(false)
    const [issues, setIssues] = useState(false)
    const [logs, setLogs] = useState(false)

    const [action, setAction] = useState(false)
    const [MDAS, setMDAS] = useState<any[]>([])
    const [statrows, setStatRows] = useState<any[]>([])
    const [logrows, setLogRows] = useState<any[]>([])

    const [tableIcon, setTableIcon] = useState('#101010')
    const [statsIcon, setStatsIcon] = useState('#ABAAAA')
    const [issuesIcon, setIssuesIcon] = useState('#ABAAAA')
    const [logsIcon, setLogsIcon] = useState('#ABAAAA')

    const [xValues, setXValues] = useState<any[]>([])
    const [yValues, setYValues] = useState<any[]>([])

    const [highest, setHighest] = useState(0)


    const [rows, setRows] = useState<any[]>([])
    function getAll() {
        fetch('/api/get/all').then(response => response.json()).then((result) => setRows(result))
    }

    function getStats() {
        fetch('/api/get/stats').then(response => response.json()).then((result) => setStatRows(result))
    }

    function getLogs() {
        fetch('/api/get/logs/all').then(response => response.json()).then((result) => setLogRows(result))

    }

    // function getNumbers() {
    //     fetch('/api/count/all/total').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/completed').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/pending').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/returned').then(response => response.json()).then((result) => console.log(result))
    // }




    useEffect(() => {
        const size_no: number[] = []
        const y_no: number[] = []
        const MDASArray = [...content.MDAS.A, ...content.MDAS.B, ...content.MDAS.C, ...content.MDAS.D]
        getAll()

        setMDAS(MDASArray)

        getStats()

        getLogs()

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

    function DownloadAll() {
        const worksheet = XLSX.utils.json_to_sheet(rows)

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "All Files");

        XLSX.writeFile(workbook, "All Files.xlsx", { compression: true });
    }

    function showTable() {
        setTable(true)
        setStats(false)
        setIssues(false)
        setLogs(false)
        setTableIcon('#101010')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')
        setLogsIcon('#ABAAAA')

        getAll()
    }

    function showStats() {
        setTable(false)
        setStats(true)
        setIssues(false)
        setLogs(false)
        setTableIcon('#ABAAAA')
        setStatsIcon('#101010')
        setIssuesIcon('#ABAAAA')
        setLogsIcon('#ABAAAA')
        getStats()

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
        setTable(false)
        setStats(false)
        setIssues(true)
        setLogs(false)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#101010')
        setLogsIcon('#ABAAAA')
    }

    function showLogs() {
        setTable(false)
        setStats(false)
        setIssues(false)
        setLogs(true)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')
        setLogsIcon('#101010')
    }




    if (user) {
        if (user.sub == process.env.AUTH0_SUPER) {
            return (
                <main className='box-border flex w-screen h-screen overflow-hidden relative'>
                    <SideBar worktable={showTable} logstable={showLogs} statstable={showStats} icons={{
                        tableIcon: tableIcon,
                        statsIcon: statsIcon,
                        issuesIcon: issuesIcon,
                        logsIcon: logsIcon
                    }} issuestable={showIssues} />

                    <section className='box-border flex flex-col w-full gap-16 relative h-full overflow-x-hidden'>
                        <Header user_role={`Beta Tester`} username={user.name} page={`Office of the Commissioner`} notification={[]} />

                        <section className='flex flex-col items-end box-border h-full gap-10 p-10'>
                            {
                                table && (
                                    <>
                                        <div id={styles["button_holder"]} className="flex w-full justify-end gap-10 items-center">
                                            <button className="flex items-center justify-center cursor-pointer bg-transparent border-none"><Image src={searchIcon} alt='' /></button>
                                            <Button onclick={() => setAction(true)}>Add New File</Button>
                                            <Button onclick={DownloadAll}>Download Table</Button>
                                        </div>

                                        <Table
                                            actions={[]}
                                            headers={[]}
                                            filelocation={undefined} content={rows} />
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