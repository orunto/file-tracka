'use client'
import SearchIcon from '../../public/icons/eva_search-outline.svg'
import Image from 'next/image'

export default function SearchBar() {
    return (
        <fieldset className='flex items-center w-full'>
            <Image src={SearchIcon} alt="" className='-mr-10' />

            <input className="ml-4 border-box flex gap-2 rounded-lg w-full bg-transparent border-2 border-solid border-gray-100 outline-none text-xl font-semibold px-12 py-4"
                type="text" name="search" id="" placeholder="Search for File..." />
        </fieldset>
    )
}