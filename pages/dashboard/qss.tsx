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
import prisma from "@/lib/prisma"

export default function QSS() {
    const { user } = useUser()

    const [table, setTable] = useState(true)
    const [stats, setStats] = useState(false)
    const [issues, setIssues] = useState(false)
    const [action, setAction] = useState(false)
    const [MDAS, setMDAS] = useState<any[]>([])
    const [statrows, setStatRows] = useState<any[]>([])

    const [tableIcon, setTableIcon] = useState('#101010')
    const [statsIcon, setStatsIcon] = useState('#ABAAAA')
    const [issuesIcon, setIssuesIcon] = useState('#ABAAAA')

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

    // function getNumbers() {
    //     fetch('/api/count/all/total').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/completed').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/pending').then(response => response.json()).then((result) => console.log(result))
    //     fetch('/api/count/all/returned').then(response => response.json()).then((result) => console.log(result))
    // }

    
    
    useEffect(() => {        
        const MDASArray = [...content.MDAS.A, ...content.MDAS.B, ...content.MDAS.C, ...content.MDAS.D]
        getAll()

        setMDAS(MDASArray)

        getStats()

        // getNumbers()
    }, [table, stats, xValues, yValues])

    function showTable() {
        setTable(true)
        setStats(false)
        setIssues(false)
        setTableIcon('#101010')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#ABAAAA')

        // myChart.destroy()
    }

    const size_no: number[] = []
    const y_no: number[] = []
    function showStats() {
        setTable(false)
        setStats(true)
        setIssues(false)
        setTableIcon('#ABAAAA')
        setStatsIcon('#101010')
        setIssuesIcon('#ABAAAA')


        for (let s = 1; s <= 31;  s+=2) {
            size_no.push(s)
            
            setXValues(size_no)
        }  

        setTimeout(() => {
            for (let j = 1; j <= 40;  j+=2) {
                y_no.push(j)
                
                setYValues(y_no)
            }  
            
        }, 200);


        setTimeout(() => {
            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Completed',
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    },
                    {
                        label: 'Pending',
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    },
                    {
                        label: 'Returned',
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    }
                ]
                },
            });

        }, 500);
    }

    function showIssues() {
        setTable(false)
        setStats(false)
        setIssues(true)
        setTableIcon('#ABAAAA')
        setStatsIcon('#ABAAAA')
        setIssuesIcon('#101010')
    }




    if (user) {
        if (user.sub == process.env.AUTH0_SUPER) {
            return (
                <main className='box-border flex w-screen h-screen overflow-hidden relative'>
                    <SideBar worktable={showTable} logstable={showIssues} statstable={showStats} icons={{
                        tableIcon: tableIcon,
                        statsIcon: statsIcon,
                        issuesIcon: issuesIcon
                    }} />

                    <section className='box-border flex flex-col w-full gap-16 relative h-full overflow-x-hidden'>
                        <Header user_role={`Beta Tester`} username={user.name} page={`QSS`} />

                        <section className='flex flex-col items-end box-border h-full gap-10 p-10'>
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