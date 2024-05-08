'use client'
import Dropdown from '@/components/atoms/Dropdown';
import { Notify } from 'notiflix'
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'
import Header from '@/components/molecules/Header';
import Table from '@/components/compounds/Table';
let header = [`MDA`, `File Title`, `File Number`, `Amount`, `Date Received`, `Action Taken`, ``]
let row = [`Bureau of Information Technology`, `A`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`,]
import DetailsModal from '@/components/molecules/DetailsModal';
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import AssignModal from '@/components/molecules/AssignModal';
import { useEffect, useState } from 'react';
import TablesToggle from '@/components/molecules/TablesToggle';
import prisma from '@/lib/prisma';
import { GetServerSideProps, GetStaticProps } from 'next';
import { props } from '@/components/compounds/Table';
import ActionModal from '@/components/molecules/AcceptModal';
import { usePathname } from 'next/navigation';
import SideBar from '@/components/molecules/SideBar';
import LogsTable from '@/components/compounds/LogsTable';
import StatsTable from '@/components/compounds/StatsTable';


export const getStaticProps: GetStaticProps = async () => {
    const assigned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Recommended', fileLocation: 'DB' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateDBRecommended: true,
            actionTaken: true,
        }
    });
    const queue = await prisma.filerecords.findMany({
        where: { actionTaken: 'Recommended', fileLocation: 'PS', datePSRecommended: null },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            datePSReceived: true,
            actionTaken: true,
            groupDays: true
        }
    });
    const returned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Returned', fileLocation: 'PS', },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            fileLocation: true,
            dateReturnedtoRegistry: true,
            actionTaken: true,
        }
    });
    const track = await prisma.filerecords.findMany({
        where: { actionTaken: 'Recommended', fileLocation: 'PS', },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            datePSRecommended: true,
            actionTaken: true,
        }
    });
    return {
        props: {
            assigned: JSON.parse(JSON.stringify(assigned)),
            queue: JSON.parse(JSON.stringify(queue)),
            returned: JSON.parse(JSON.stringify(returned)),
            track: JSON.parse(JSON.stringify(track)),
        },
        revalidate: 10,
    };
};

type Props = {
    assigned: props["content"],
    queue: props["content"],
    returned: props["content"],
    track: props["content"],
}

export default function PermanentSecretary(props: Props) {
    const { user, error, isLoading } = useUser();
    const [header, setHeader] = useState([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``])

    const [view, setView] = useState('none')
    const [dbview, setdbView] = useState('none')
    const [psview, setpsView] = useState('none')
    const [comview, setcomView] = useState('none')
    const [rejview, setrejView] = useState('none')

    const [action, setAction] = useState('none')
    const [dbaction, setdbAction] = useState('none')
    const [psaction, setpsAction] = useState('none')
    const [comaction, setcomAction] = useState('none')

    const [accept, setAccept] = useState('none')
    const [dbaccept, setdbAccept] = useState('none')
    const [psaccept, setpsAccept] = useState('flex')
    const [comaccept, setcomAccept] = useState('none')

    const [worktable, setWorktable] = useState(true)
    const [logstable, setLogstable] = useState(false)
    const [statstable, setStatstable] = useState(false)
    const [atlas, setatlas] = useState(false)

    const [MDAS, setMDAS] = useState<any[]>([])
    const [rows, setRows] = useState(props.assigned)


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
        if (user.sub == process.env.AUTH0_PS_ID || process.env.AUTH0_SUPER) {
            return (
                <>
    
                    <main className='box-border flex w-full gap-10'>
                    <SideBar logstable={() => { setWorktable(false); setLogstable(true); setStatstable(false); setatlas(false) }} worktable={() => { setWorktable(true); setatlas(false); setLogstable(false); setStatstable(false) }} statstable={() => { setWorktable(false); setLogstable(false); setStatstable(true) }} atlas={'flex'} atlasbutton={() => { setWorktable(false); setLogstable(false); setStatstable(false); setatlas(true) }} />
                        <section className='box-border flex flex-col gap-16 mt-16 px-12 w-full ml-12'>
                            <Header user_role={`Beta Tester`} username={user.name} page={`Permanent Secretary   `} />
    
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
                                {
                                    worktable && (
                                        <>
                                        <TablesToggle clickeventone={() => { setLine("0%"); setButtonColor("button_one"); setRows([]); setRows(props.assigned); setpsAccept('flex'); setpsView('none'); setpsAction('none'); setHeader([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                            clickeventtwo={() => { setLine("100%"); setButtonColor("button_two"); setRows([]); setRows(props.queue); setpsAccept('none'); setpsAction('flex'); setpsView('none'); setHeader([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date`, `Days`, `Action Taken`, ``]) }}
                                            clickeventthree={() => { setLine("200%"); setButtonColor("button_three"); setRows([]); setRows(props.returned); setpsAccept('none'); setpsAction('none'); setpsView('flex'); setHeader([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date `, `Action Taken`, ``]) }}
                                            clickeventfour={() => { setLine("300%"); setButtonColor("button_four"); setRows([]); setRows(props.track); setpsAccept('none'); setpsAction('none'); setpsView('flex'); setHeader([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                            buttoncolor={buttonColor} line={line}
                                            buttonone={`Reception`} buttontwo={`Queue`} buttonthree={`Returned`} buttonfour={`Recommended`}
                                        />
            
                                        <Table viewbutton={view} actionbutton={action} acceptbutton={accept} pageno={pageNo} content={rows} headers={header} actions={content.Actions.Registry} dbacceptbutton={dbaccept} psacceptbutton={psaccept} comacceptbutton={comaccept} filelocation={'PS'} dbactionbutton={dbaction} psactionbutton={psaction} comactionbutton={comaction} dbviewbutton={dbview} psviewbutton={psview} comviewbutton={comview} rejviewbutton={rejview} finish={'none'} />
                                        
                                        </>

                                    )
                                }


                                {
                                    logstable && (

                                        <LogsTable content={[]} pageno={undefined} viewbutton={undefined} />
                                    )
                                }

                                {
                                    statstable && (
                                        <>

                                            <TablesToggle clickeventone={() => { setLine("0%"); setButtonColor("button_one"); setRows([]); setRows(props.assigned); setView('none'); setAccept('flex'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                                clickeventtwo={() => { setLine("100%"); setButtonColor("button_two"); setRows([]); setRows([]); setAccept('none'); setAction('flex'); setView('none'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                                clickeventthree={undefined}
                                                clickeventfour={undefined}
                                                buttoncolor={buttonColor} line={line}
                                                buttonone={`Daily`} buttontwo={`Monthly`} buttonthree={undefined} buttonfour={undefined}
                                            />

                                            <StatsTable content={[]} pageno={undefined} viewbutton={undefined} />
                                        </>
                                    )
                                }
                            </section>
    
                        </section>
                    </main>
    
    
                </>
            )
        }

        else {
            window.location.assign('/')

        }

    }
}