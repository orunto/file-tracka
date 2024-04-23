'use client'

import content from '@/lib/dropdown-content.json'

export default function Modal () {
    return (
        <div className="fixed top-0 left-0 w-full h-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl w-max m-auto my-auto" action="">
                <h1 className='font-bold'>NEW FILE DETAILS</h1>
                <select className='border-box flex gap-2 w-36 rounded-lg bg-transparent border-2 border-gray-100 text-xl font-medium px-12 py-4' name="MDAs" id="mdaselect">
                    {
                        content.MDAS.map((clone, i) => (
                            <option value={clone} key={i}>{clone}</option>
                        ))
                    }
                </select>
            </form>
        </div>
    )
}