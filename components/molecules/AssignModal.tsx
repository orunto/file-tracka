'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import content from '@/lib/dropdown-content.json'
import Dropdown from '../atoms/Dropdown'
import Button from '../atoms/Button'

interface props {
    cancel: any,
    assign: any
}
export default function Modal(props: props) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl max-h-96 overflow-y-scroll" action="" style={{ width: 'max-content' }}>
                <h1 className='font-bold'>NEW FILE DETAILS</h1>
                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label className='font-semibold' htmlFor="MDAS">MDA</label>
                    <select className="box-border flex gap-2 rounded-lg w-full bg-transparent border-2 border-gray-100 text-base font-medium px-4 py-4" style={{ maxWidth: '100%' }} name={`MDA`} id={`MDA`}>
                        <option className="text-xl font-semibold" value="MDAS" disabled selected>Select an MDA</option>
                        {
                            content.MDAS.map((clone, i) => (
                                <option value={clone} key={i}>{clone}</option>
                            ))
                        }
                    </select>
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="group">Assigned Group</label>
                    <input type="text" name="group" id="group" className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Group' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="date">Date Received</label>
                    <input type="text" name="date" id="date" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='DD / MM / YYYY' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="title">File Title</label>
                    <input type="text" name="title" id="title" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file title...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="file_number">File Number</label>
                    <input type="text" name="file_number" id="file_number" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file number...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" id="amount" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='N000,000,000' />
                </fieldset>

                <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                    <Button onclick={props.cancel}>
                        Cancel
                    </Button>
                    <Button onclick={props.assign}>
                        Assign File
                        <Image src={sendIcon} alt='' />
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}