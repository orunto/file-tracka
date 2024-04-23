'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import Dropdown from '../atoms/Dropdown'
import Button from '../atoms/Button'

interface props {
    cancel: any,
    content: any[]
}

export default function DetailsModal(props: props) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl max-h-96 overflow-y-scroll" action="" style={{ width: 'max-content' }}>
                <h1 className='font-bold'>NEW FILE DETAILS</h1>
                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label className='font-semibold' htmlFor="Actions">Action Taken</label>
                    <select className="box-border flex gap-2 rounded-lg w-full bg-transparent border-2 border-gray-100 text-base font-medium px-4 py-4" style={{ maxWidth: '100%' }} name={`MDA`} id={`MDA`}>
                        <option className="text-base font-semibold" value="Actions" disabled selected>None</option>
                        {
                            props.content.map((clone, i) => (
                                <option value={clone} key={i}>{clone}</option>
                            ))
                        }
                    </select>
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="date">Date Received</label>
                    <input type="text" name="date" id="date" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='DD / MM / YYYY' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="days">Days Spent</label>
                    <input type="text" name="days" id="days" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='DD / MM / YYYY' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="title">File Title</label>
                    <input type="text" name="title" id="title" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file title...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="file_number">File Number</label>
                    <input type="text" name="file_number" id="file_number" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file number...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" id="amount" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='N000,000,000' />
                </fieldset>

                <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                    <Button onclick={props.cancel}>
                        Close
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}