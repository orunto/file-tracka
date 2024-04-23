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

export default function Registry() {
    const { user, error, isLoading } = useUser();
    const [view, setView] = useState(false)

    const [table, setTable] = useState([])


    const [assign, setAssign] = useState(false)

    // useEffect(() => {
    // }, [user])

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
                                <Dropdown placeholder={`MDAS`} name={`MDAS`} content={content.MDAS} />
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

                            <Table material={table} content={row} view={() => setView(true)} headers={header} actions={content.Actions.Registry} />
                        </section>
                    </main>

                    {
                        assign && (
                            <AssignModal cancel={() => setAssign(false)} assign={() => {
                                
                                setAssign(false)
                                let a = document.getElementById()
                                setTable([])
                            }} />

                        )
                    }

                    {
                        view && (
                            <DetailsModal  days={row[5]} date={row[5]} amount={row[4]} number={row[3]} title={row[2]} mda={row[0]} content={content.Actions.Groups} cancel={() => setView(false)} />
                        )
                    }
                </>
            )

        }

    }
}