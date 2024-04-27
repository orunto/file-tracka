'use client'
import Dropdown from '@/components/atoms/Dropdown';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'
import Header from '@/components/molecules/Header';
import Table from '@/components/compounds/Table';
import DetailsModal from '@/components/molecules/DetailsModal';
import { useState } from 'react';
let header = [`MDA`, `File Title`, `File Number`, `Amount`, `Date Received`, `Days Spent`, `Action Taken`, ``]
let row = [`Bureau of Information Technology`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`, `2`]


export default function Groups() {
    const { user, error, isLoading } = useUser();
    const [view, setView] = useState(false)

    if (user) {
        if (user.sub == process.env.AUTH0_GROUPA_ID || process.env.AUTH0_GROUPB_ID || process.env.AUTH0_GROUPC_ID || process.env.AUTH0_GROUPD_ID)  {
            return (
                <>
                    <Header user_role={`Beta Tester`} username={user.name} page={`Group ` + window.location.hash.substring(1)} />
    
                    <main className='box-border flex flex-col gap-16 mt-16 px-12 w-full'>
                        <section className='box-border flex flex-col gap-4 w-full'>
                            <header className='text-xl font-semibold'>Filters</header>
    
                            <div className='flex gap-4'>
                                <Dropdown placeholder={`MDAS`} name={`MDAS`} content={content.MDAS.A} />
                                <Dropdown placeholder={`Days`} name={`Days`} content={content.Groups} />
                                <Dropdown placeholder={`Action Taken`} name={`Action Taken`} content={content.Actions.Groups} />
                                <SearchBar />
                            </div>
                        </section>
    
                        <section className='flex flex-col items-end w-full box-border gap-8'>
                            <Table content={row} headers={header} actions={content.Actions.Groups} view={() => setView(true)} />
    
                        </section>
                    </main>

                    {
                        view && (
                            <DetailsModal days={row[5]} date={row[4]} amount={row[3]} number={row[2]} title={row[1]} mda={row[0]} content={content.Actions.Groups} cancel={() => setView(false)}/>
                        )
                    }

                </>
            )
        }

        else {
            window.location.assign('/')
        }
    }

}