'use client'
import Dropdown from '@/components/atoms/Dropdown';
import { Notify } from 'notiflix'
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'
import Header from '@/components/molecules/Header';
import Table from '@/components/compounds/Table';
let header = [`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date Received`, `Action Taken`, ``]
let row = [`Bureau of Information Technology`, `A`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`,]
import DetailsModal from '@/components/molecules/DetailsModal';
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import AssignModal from '@/components/molecules/AssignModal';
import { useEffect, useState } from 'react';
import TablesToggle from "@/components/molecules/TablesToggle"


export default function Registry() {
    const { user, error, isLoading } = useUser();
    const [view, setView] = useState(false)
    const [MDAS, setMDAS] = useState<any[]>([])
    const [rows, setRows] = useState<any[]>([])


    const [mda, setMdapick] = useState('')
    const [assignedgroup, setGrouppick] = useState('')


    const [table, setTable] = useState([])


    const [assign, setAssign] = useState(false)

    const [buttonColor, setButtonColor] = useState("button_one")
    const [line, setLine] = useState("0%")

    function Assigned() {
        fetch('/api/get/assigned')
            .then((response) => response.json())
            .then((result) => {

                setRows(result.result.rows);
                console.log(Object.values(result.result.rows))
                if (Object.values(result.result.rows).length > 7) {
                    if ((Object.values(result.result.rows).length / 7) % 1 != 0) {
                        setPageNo(Math.round(Object.values(result.result.rows).length / 7) + 1)
                        console.log('h');

                    }
                    setPageNo(Math.round(Object.values(result.result.rows).length / 7) + 1)
                    console.log('h');

                } else if (Object.values(result.result.rows).length < 7) {
                    setPageNo(1)
                }
                else {
                    setPageNo(Object.values(result.result.rows).length / 7)
                    console.log('t')
                    console.log(Object.values(result.result.rows).length)
                }
            })
            .catch((error) => console.error(error));

    }

    const [pageNo, setPageNo] = useState(0)

    function GetPageNo() {
        setTimeout(() => {
            if ((rows.length / 7) % 1 != 0) {
                setPageNo(Math.round(rows.length / 7) + 1)
                console.log('h');

            } else {
                setPageNo(rows.length / 7)
                console.log('t')
                console.log(rows.length)
            }

        }, 500);
    }




    useEffect(() => {
        const MDASArray = [...content.MDAS.A, ...content.MDAS.B, ...content.MDAS.C, ...content.MDAS.D]

        setMDAS(MDASArray)


        Assigned()

    }, [table])

    function Assign(e: any) {
        e.preventDefault()
        let title = document.getElementById("title") as HTMLSelectElement
        let file_number = document.getElementById("file_number") as HTMLInputElement
        let amount = document.getElementById("amount") as HTMLInputElement


        var requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`/api/assign?mda=${mda}&assignedgroup=${assignedgroup}&filetitle=${title.value}&filenumber=${file_number.value}&fileamount=${amount.value}&dateassigned=${Date.now() / 1000}&actiontaken=Assigned`, {
            method: 'POST',
        })
            .then((response) => response.json()).then((result) => {
                console.log(result)
                setAssign(false)
            })
            .catch((error) => console.error(error));
    }


    function setGroup() {
        let mda = document.getElementById("MDA") as HTMLSelectElement

        setMdapick(mda.value)
    }


    if (user) {
        if (user.sub != process.env.AUTH0_REG_ID) {
            window.location.assign('/')
        }

        else {
            return (
                <>
                    <Header user_role={`Beta Tester`} username={user.name} page={`Registry`} />

                    <main className='box-border flex flex-col gap-16 mt-16 px-12 w-full'>
                        <section className='box-border flex flex-col gap-4 w-full'>
                            <header className='text-xl font-semibold'>Filters</header>

                            <div className='flex gap-4'>
                                <Dropdown placeholder={`MDAS`} name={`MDAS`} content={MDAS} />
                                <Dropdown placeholder={`Groups`} name={`Groups`} content={content.Groups} />
                                <Dropdown placeholder={`Action Taken`} name={`Action Taken`} content={content.Actions.Registry} />
                                <SearchBar />
                            </div>
                        </section>

                        <section className='flex flex-col items-end w-full box-border gap-8'>
                            <Button onclick={() => setAssign(true)}>
                                Assign a New File
                                <Image src={sendIcon} alt='' />
                            </Button>

                            <TablesToggle clickeventone={() => {setLine("0%"); setButtonColor("button_one")}} 
                                clickeventtwo={() => {setLine("100%"); setButtonColor("button_two")}} 
                                clickeventthree={() => {setLine("200%"); setButtonColor("button_three")}} 
                                clickeventfour={() => {setLine("300%"); setButtonColor("button_four")}}
                                buttoncolor={buttonColor} line={line}
                                buttonone={`Assigned`} buttontwo={`Completed`} buttonthree={`Returned`} buttonfour={`Back to MDA`}
                            />


                            <Table pageno={pageNo} content={rows} headers={header} actions={content.Actions.Registry} />
                        </section>
                    </main>

                    {
                        assign && (
                            <AssignModal mdas={MDAS} cancel={() => { setAssign(false); setTable([]) }} />

                        )
                    }


                </>
            )

        }

    }
}