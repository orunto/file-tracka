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
        where: { actionTaken: 'Assigned', assignedGroup: 'B', fileLocation: 'Registry' },
        select: {
            mda: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateAssigned: true,
            actionTaken: true,
        }
    });
    const queue = await prisma.filerecords.findMany({
        where: { actionTaken: 'Assigned', assignedGroup: 'B', fileLocation: `Group` },
        select: {
            mda: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateGroupReceived: true,
            actionTaken: true,
            groupDays: true
        }
    });
    const completed = await prisma.filerecords.findMany({
        where: { actionTaken: 'Approved', assignedGroup: 'B', fileLocation: 'Group' },
        select: {
            mda: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateGroupReceived: true,
            actionTaken: true,
            groupDays: true,
            dateApproved: true
        }
    });
    const returned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Returned', assignedGroup: 'B', },
        select: {
            mda: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            fileLocation: true,
            dateReturnedtoRegistry: true,
            actionTaken: true,
        }
    });
    const track = await prisma.filerecords.findMany({
        where: { actionTaken: 'Appraised', assignedGroup: 'B', },
        select: {
            mda: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateAppraised: true,
            actionTaken: true,
        }
    });
    return {
        props: {
            assigned: JSON.parse(JSON.stringify(assigned)),
            queue: JSON.parse(JSON.stringify(queue)),
            returned: JSON.parse(JSON.stringify(returned)),            
            completed: JSON.parse(JSON.stringify(completed)),

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
    completed: props["content"],

}

export default function Groups(props: Props) {
    const { user, error, isLoading } = useUser();
    const [header, setHeader] = useState([`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date Assigned`, `Action Taken`, ``])

    const [view, setView] = useState('none')
    const [dbview, setdbView] = useState('none')
    const [psview, setpsView] = useState('none')
    const [comview, setcomView] = useState('none')
    const [rejview, setrejView] = useState('none')

    const [action, setAction] = useState('none')
    const [dbaction, setdbAction] = useState('none')
    const [psaction, setpsAction] = useState('none')
    const [comaction, setcomAction] = useState('none')

    const [accept, setAccept] = useState('flex')
    const [dbaccept, setdbAccept] = useState('none')
    const [psaccept, setpsAccept] = useState('none')
    const [comaccept, setcomAccept] = useState('none')

    const [MDAS, setMDAS] = useState<any[]>([])
    const [rows, setRows] = useState(props.assigned)

    const [worktable, setWorktable] = useState(true)
    const [logstable, setLogstable] = useState(false)
    const [statstable, setStatstable] = useState(false)
    const [atlas, setatlas] = useState(false)


    const [mda, setMdapick] = useState('')
    const [assignedgroup, setGrouppick] = useState('')


    const [table, setTable] = useState([])


    const [assign, setAssign] = useState(false)

    const [buttonColor, setButtonColor] = useState("button_one")
    const [line, setLine] = useState("0%")


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



    }, [])



    if (user) {
        if (user.sub == process.env.AUTH0_GROUPB_ID || process.env.AUTH0_SUPER) {
            return (
                <>
                    <main className='box-border flex w-full gap-10'>
                    <SideBar logstable={() => { setWorktable(false); setLogstable(true); setStatstable(false); setatlas(false) }} worktable={() => { setWorktable(true); setatlas(false); setLogstable(false); setStatstable(false) }} statstable={() => { setWorktable(false); setLogstable(false); setStatstable(true) }} atlas={'flex'} atlasbutton={() => { setWorktable(false); setLogstable(false); setStatstable(false); setatlas(true) }} />
                        <section className='box-border flex flex-col gap-16 mt-16 px-12 w-full ml-12'>
                            <Header user_role={`Beta Tester`} username={user.name} page={`Group B`} />

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

                                            <TablesToggle clickeventone={() => { setLine("0%"); setButtonColor("button_one"); setRows([]); setRows(props.assigned); setView('none'); setAccept('flex'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                                clickeventtwo={() => { setLine("100%"); setButtonColor("button_two"); setRows([]); setRows(props.queue); setAccept('none'); setAction('flex'); setView('none'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Days`, `Action Taken`, ``]) }}
                                                clickeventthree={() => { setLine("200%"); setButtonColor("button_three"); setRows([]); setRows(props.returned); setAccept('none'); setAction('none'); setView('flex'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                                clickeventfour={() => { setLine("300%"); setButtonColor("button_four"); setRows([]); setRows(props.track); setAccept('none'); setAction('none'); setView('flex'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
                                                buttoncolor={buttonColor} line={line}
                                                buttonone={`Reception`} buttontwo={`Queue`} buttonthree={`Returned`} buttonfour={`Appraised`}
                                            />

                                            <Table viewbutton={view} actionbutton={action} acceptbutton={accept} pageno={pageNo} content={rows} headers={header} actions={content.Actions.Registry} dbacceptbutton={dbaccept} psacceptbutton={psaccept} comacceptbutton={comaccept} filelocation={'Group'} dbactionbutton={dbaction} psactionbutton={'none'} comactionbutton={'none'} dbviewbutton={dbview} psviewbutton={psview} comviewbutton={comview} rejviewbutton={rejview} finish={'none'} />
                                        </>
                                    )
                                }

{
                                    atlas && (
                                        <>

                                            <Table viewbutton={view} actionbutton={'none'} acceptbutton={'none'} pageno={pageNo} content={props.completed} headers={[`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Days`, `Action`, ``]} actions={content.Actions.Registry} dbacceptbutton={dbaccept} psacceptbutton={psaccept} comacceptbutton={comaccept} filelocation={'Group'} dbactionbutton={dbaction} psactionbutton={'none'} comactionbutton={'none'} dbviewbutton={dbview} psviewbutton={psview} comviewbutton={comview} rejviewbutton={rejview} finish={'flex'} />
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
                                                clickeventtwo={() => { setLine("100%"); setButtonColor("button_two"); setRows([]); setRows(props.queue); setAccept('none'); setAction('flex'); setView('none'); setHeader([`MDA`, `File Title`, `File Number`, `Amount`, `Date`, `Action Taken`, ``]) }}
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