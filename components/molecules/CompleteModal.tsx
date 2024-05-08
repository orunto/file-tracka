'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import Dropdown from '../atoms/Dropdown'
import Button from '../atoms/Button'
import styles from './layout.module.scss'

interface props {
    cancel: any,
    date: any,
    title: any,
    number: any,
    amount: any,
    mda: any,
    action: any,
}

export default function ActionModal(props: props) {

    return (
        <div id={styles["details"]} className="fixed top-0 left-0 w-full h-screen flex items-center justify-center" >
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl max-h-96 overflow-y-scroll" action="" style={{ width: 'max-content' }}>
                <h1 className='font-bold'>Confirm this file has been recieved</h1>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="mda">MDA</label>
                    <input type="text" name="mda" id="mda" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.mda} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="date">Date Assigned</label>
                    <input type="text" name="date" id="date" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.date} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="title">File Title</label>
                    <input type="text" name="title" id="title" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.title} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="file_number">File Number</label>
                    <input type="text" name="file_number" id="file_number" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.number} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" id="amount" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.amount} />
                </fieldset>

                <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                    <Button onclick={props.cancel}>
                        Close
                    </Button>

                    <Button onclick={props.action}>
                        Confirm
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}