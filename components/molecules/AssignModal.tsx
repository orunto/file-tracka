'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import content from '@/lib/dropdown-content.json'
import Dropdown from '../atoms/Dropdown'
import Button from '../atoms/Button'
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import prisma from '@/lib/prisma';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';


interface props {
    cancel: any,
    // assign: any,
    mdas: any[],
    // setgroup: any,
    // assignedgroup: any,
}

export default function Modal(props: props) {
    const { user, error, isLoading } = useUser();

    const router = useRouter()

    const [mda, setMdapick] = useState('')
    const [assignedgroup, setGrouppick] = useState('')
    const [filetitle, setFiletitle] = useState('')
    const [filenumber, setFileNumber] = useState('')
    const [fileamount, setFileamount] = useState('')
    const [dateassigned, setDate] = useState(new Date())

    

    useEffect(() => {
        if (content.MDAS.A.indexOf(mda) != -1) {
            setGrouppick('A')
        } else if (content.MDAS.B.indexOf(mda) != -1) {
            setGrouppick('B')
        } else if (content.MDAS.C.indexOf(mda) != -1) {
            setGrouppick('C')
        } else if (content.MDAS.D.indexOf(mda) != -1) {
            setGrouppick('D')
        }

    }, [assignedgroup, mda])



    function setGroup() {
        let mda = document.getElementById("MDA") as HTMLSelectElement

        setMdapick(mda.value)
    }

    async function dothething (e: any) {
        e.preventDefault()

        const newfiledata = {
              mda: mda,
              assignedGroup: assignedgroup,
              fileTitle: filetitle,
              fileNumber: filenumber,
              fileAmount: fileamount,
              actionTaken: 'Assigned',
              dateAssigned: dateassigned,
              userId: user?.name as string,
              fileLocation: 'Registry',
              groupDays: '1'
            }

        const response = await fetch('/api/assign', {
            method: 'POST',
            body: JSON.stringify(newfiledata)
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        } else {
            Notify.success('File Assigned Successfully')
            setTimeout(() => {
                window.location.reload()
            }, 500);
        }

        return await response.json()
    }
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '2' }}>
            <form className="flex flex-col gap-8 px-12 py-20 bg-white rounded-2xl max-h-96 overflow-y-scroll" style={{ width: 'max-content' }}>
                <h1 className='font-bold'>NEW FILE DETAILS</h1>
                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label className='font-semibold' htmlFor="MDAS">MDA</label>
                    <select onChange={setGroup} className="box-border flex gap-2 rounded-lg w-full bg-transparent border-2 border-gray-100 text-base font-medium px-4 py-4" style={{ maxWidth: '100%' }} name={`MDA`} id={`MDA`}>
                        <option className="text-xl font-semibold" value="MDAS" disabled selected>Select an MDA</option>
                        {
                            props.mdas.map((clone, i) => (
                                <option value={clone} key={i}>{clone}</option>
                            ))
                        }
                    </select>
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="group">Assigned Group</label>
                    <input disabled type="text" name="group" id="group" className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} value={'Group ' + assignedgroup} placeholder={'Group ' + assignedgroup} />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="dateassigned">Date Assigned</label>
                    <input disabled type="text" name="dateassigned" id="dateassigned" className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} value={dateassigned.toDateString()} placeholder='DD / MM / YYYY' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="title">File Title</label>
                    <input onChange={(e) => setFiletitle(e.target.value)} type="text" name="title" id="title" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file title...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="file_number">File Number</label>
                    <input onChange={(e) => setFileNumber(e.target.value)} type="text" name="file_number" id="file_number" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='Enter file number...' />
                </fieldset>

                <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                    <label htmlFor="amount">Amount</label>
                    <input onChange={(e) => setFileamount(e.target.value)} type="text" name="amount" id="amount" className="box-border border-2 border-solid border-gray-100 outline-none  flex gap-2 rounded-lg w-full bg-transparent text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder='N000,000,000' />
                </fieldset>

                <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                    <Button onclick={props.cancel}>
                        Close
                    </Button>
                    <Button onclick={dothething}>
                        Assign File
                        <Image src={sendIcon} alt='' />
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}