'use client'
import Dropdown from '@/components/atoms/Dropdown';
import SearchBar from '@/components/atoms/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import content from '@/lib/dropdown-content.json'


export default function Registry() {
    const { user, error, isLoading } = useUser();

    return (
        user && (
            <>
                <nav className="box-border flex justify-between items-center m-0 px-12 py-6">
                    <a href="#" className="m-0 text-black text-4xl font-bold">REGISTRY</a>

                    <div className="flex px-8 py-1 border-2 border-gray-900 gap-6 rounded-lg">
                        <article className="flex gap-2 items-center">
                            <header className="flex items-center text-2xl font-semibold bg-green-500 text-gray-50 px-6 h-full rounded-lg">O</header>

                            <p className="flex flex-col">
                                <b className="text-base">{user.name}</b>
                                <span className="text-sm">Beta Tester</span>
                            </p>

                        </article>

                        <a href="" className="text-red-600">Logout</a>
                    </div>
                </nav>

                <main className='box-border flex flex-col gap-16 mt-16 px-12 w-full'>
                    <section className='box-border flex flex-col gap-4 w-full'>
                        <header className='text-xl font-semibold'>Filters</header>

                        <div className='flex gap-4'>
                            <Dropdown name={`MDAS`} content={content.MDAS}/>
                            <Dropdown name={`Groups`} content={content.Groups}/>
                            <Dropdown name={`Action Taken`} content={content.Actions.Registry}/>
                            <SearchBar/>
                        </div>
                    </section>
                </main>
            </>
        )
    )
}