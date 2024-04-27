'use client'
import Dropdown from '@/components/atoms/Dropdown';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'
import Header from '@/components/molecules/Header';
import Table from '@/components/compounds/Table';
let header = [`MDA`, `Group`, `File Title`, `File Number`, `Amount`, `Date Received`, `Action Taken`, ``]
let row = [`Bureau of Information Technology`, `A`, `General Expenditures and`, `0000001`, `20,000,000.00`, `18/04/2024`,]

import { useState } from 'react';

export default function DirectorBudget() {
    const { user, error, isLoading } = useUser();
    const [view, setView] = useState(false)


    if (user) {
        if (user.sub != process.env.AUTH0_DIRECTOR_ID) {
            window.location.assign('/')
        }

        else {

            return (
                <>
                    <Header user_role={`Beta Tester`} username={user.name} page={`Director of Budgets`} />

                    <main className='box-border flex flex-col gap-16 mt-16 px-12 w-full'>
                        <section className='box-border flex flex-col gap-4 w-full'>
                            <header className='text-xl font-semibold'>Filters</header>

                            <div className='flex gap-4'>
                                <Dropdown placeholder={`MDAS`} name={`MDAS`} content={content.MDAS.A} />
                                <Dropdown placeholder={`Days`} name={`Days`} content={content.Groups} />
                                <Dropdown placeholder={`Action Taken`} name={`Action Taken`} content={content.Actions['Director Budgets']} />
                                <SearchBar />
                            </div>
                        </section>

                        <section className='flex flex-col items-end w-full box-border gap-8'>
                            <Button onclick="">Assign a New File</Button>

                            <Table content={row} view={() => setView(false)}  headers={header} actions={content.Actions['Director Budgets']} />
                        </section>
                    </main>
                </>
            )
        }
    }

}