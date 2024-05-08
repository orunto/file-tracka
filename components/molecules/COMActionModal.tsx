'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import Dropdown from '../atoms/Dropdown'
import Button from '../atoms/Button'
import styles from './layout.module.scss'
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key, useState, } from 'react';
import { Notify } from 'notiflix';

interface props {
    cancel: any,
    date: any,
    title: any,
    number: any,
    amount: any,
    mda: any,
    action: any,
    setAction: any,
    actionArray: any[],
    filenumber: any
}

export default function ActionModal(props: props) {
    const [action, setAction] = useState('')
    const [dateassigned, setDate] = useState(new Date())


    function setfileAction() {
        let ActionTaken = document.getElementById("ActionTaken") as HTMLSelectElement

        setAction(ActionTaken.value)
    }

    async function dothething(e: any) {
        e.preventDefault()


        if (action == 'Approved') {
            const newfiledata = {
                fileNumber: props.filenumber,
                actionTaken: action,
                dateApproved: dateassigned,
                dateReturnedtoRegistry: null,
                fileLocation: 'Group'
            }

            const response = await fetch('/api/action/commissioner', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File Approved')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()
        } else if (action == 'Returned') {
            const newfiledata = {
                fileNumber: props.filenumber,
                actionTaken: action,
                dateApproved: null,
                dateReturnedtoRegistry: dateassigned,
                fileLocation: 'Commissioner'
            }

            const response = await fetch('/api/action/group', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                Notify.success('File returned')

                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()
        }

    }
    return (
        <div id={styles["details"]} className="fixed top-0 left-0 w-full h-screen flex items-center justify-center" >
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl max-h-96 overflow-y-scroll" action="" style={{ width: 'max-content' }}>
                <h1 className='font-bold'>Take action on this file</h1>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="mda">MDA</label>
                    <input type="text" name="mda" id="mda" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.mda} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="date">Date Recieved</label>
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

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label className='font-semibold' htmlFor="MDAS">MDA</label>
                    <select onChange={(e) => setAction(e.target.value)} className="box-border flex gap-2 rounded-lg w-full bg-transparent border-2 border-gray-100 text-base font-medium px-4 py-4" style={{ maxWidth: '100%' }} name={`ActionTaken`} id={`ActionTaken`}>
                        <option className="text-xl font-semibold" value="MDAS" disabled selected>Select an Action</option>
                        <option value='Approved'>Approved</option>
                        <option value='Returned'>Not Approved</option>
                    </select>
                </fieldset>

                <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                    <Button onclick={props.cancel}>
                        Close
                    </Button>

                    <Button onclick={dothething}>
                        Confirm
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}