'use client'
import Dropdown from '@/components/atoms/Dropdown';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'
import Header from '@/components/molecules/Header';
import Table from '@/components/compounds/Table';


export default function Registry() {
    const { user, error, isLoading } = useUser();

    return (
        user && (
            <>
                <Header user_role={`Beta Tester`} username={user.name} page={`Registry`} />

                <main className='box-border flex flex-col gap-16 mt-16 px-12 w-full'>
                    <section className='box-border flex flex-col gap-4 w-full'>
                        <header className='text-xl font-semibold'>Filters</header>

                        <div className='flex gap-4'>
                            <Dropdown name={`MDAS`} content={content.MDAS} />
                            <Dropdown name={`Groups`} content={content.Groups} />
                            <Dropdown name={`Action Taken`} content={content.Actions.Registry} />
                            <SearchBar />
                        </div>
                    </section>

                    <section className='flex flex-col items-end w-full box-border gap-8'>
                        <Button onclick="">Assign a New File</Button>

                        <Table />
                    </section>
                </main>
            </>
        )
    )
}