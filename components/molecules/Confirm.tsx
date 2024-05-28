'use client'
import sendIcon from '@/public/icons/iconamoon_send-fill.svg'
import Image from 'next/image';
import content from '@/lib/dropdown-content.json'
import Dropdown from '@/components/atoms/Dropdown'
import Button from '@/components/atoms/Button'
import { useEffect, useState } from 'react';
import { Loading, Notify } from 'notiflix';
import prisma from '@/lib/prisma';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import styles from '@/styles/components.module.scss'


interface props {
    cancel: any,
    date: any,
    title: any,
    number: any,
    amount: any,
    mda: any,
    action: any,
    mdas: any[],
    fileLocation: any
    // setgroup: any,
    // assignedgroup: any,
}

export default function Confirm(props: props) {
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

    async function dothething(e: any) {
        e.preventDefault()


        Loading.pulse("Confirming...")
        const newfiledata = {
            mda: mda,
            fileTitle: filetitle,
            fileNumber: filenumber,
            fileAmount: fileamount,
            assignedGroup: assignedgroup,
            actionTaken: 'Accepted',
            fileLocation: 'QSS',
            dateAccepted: dateassigned
        }

        const activity = {
            date: dateassigned,
            fileName: filetitle,
            fileNumber: filenumber,
            action: 'Accepted',
            user: user?.name as string
        }

        const notice = {
            for: 'Registry',
            message: `File: ${filenumber} added to queue`,
            date: dateassigned
        }
        // userId: user?.name as string,

        if (props.fileLocation == 'Registry') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.fileLocation,
                dateGroupReceived: new Date(),
                dateDBReceived: null,
                dateCommissonerReceived: null,
                datePSReceived: null
            }
            const record = await fetch('/api/count/allfiles', {
                method: 'POST'
            })

            const response = await fetch('/api/confirm', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            const log = await fetch('/api/log', {
                method: 'POST',
                body: JSON.stringify(activity)
            })

            const notify = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(notice)
            })


            if (!response.ok || !log.ok || !record.ok || !notify.ok) {
                Loading.remove()
                Notify.failure(response.statusText)
                throw new Error(response.statusText)
            } else {
                Loading.remove()
                Notify.success('File Confirmed Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.fileLocation == 'Group') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.fileLocation,
                dateGroupReceived: new Date(),
                dateDBReceived: null,
                dateCommissonerReceived: null,
                datePSReceived: null
            }
            const record = await fetch('/api/count/allfiles', {
                method: 'POST'
            })

            const response = await fetch('/api/confirm', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            const log = await fetch('/api/log', {
                method: 'POST',
                body: JSON.stringify(activity)
            })

            const notify = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(notice)
            })


            if (!response.ok || !log.ok || !record.ok || !notify.ok) {
                Loading.remove()
                Notify.failure(response.statusText)
                throw new Error(response.statusText)
            } else {
                Loading.remove()
                Notify.success('File Confirmed Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.fileLocation == 'DB') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.fileLocation,
                dateGroupReceived: null,
                dateDBReceived: new Date(),
                dateCommissonerReceived: null,
                datePSReceived: null
            }
            const record = await fetch('/api/count/allfiles', {
                method: 'POST'
            })

            const response = await fetch('/api/confirm', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            const log = await fetch('/api/log', {
                method: 'POST',
                body: JSON.stringify(activity)
            })

            const notify = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(notice)
            })


            if (!response.ok || !log.ok || !record.ok || !notify.ok) {
                Loading.remove()
                Notify.failure(response.statusText)
                throw new Error(response.statusText)
            } else {
                Loading.remove()
                Notify.success('File Confirmed Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.fileLocation == 'PS') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.fileLocation,
                dateGroupReceived: null,
                dateDBReceived: null,
                dateCommissonerReceived: null,
                datePSReceived: new Date()
            }

            const record = await fetch('/api/count/allfiles', {
                method: 'POST'
            })

            const response = await fetch('/api/confirm', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            const log = await fetch('/api/log', {
                method: 'POST',
                body: JSON.stringify(activity)
            })

            const notify = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(notice)
            })


            if (!response.ok || !log.ok || !record.ok || !notify.ok) {
                Loading.remove()
                Notify.failure(response.statusText)
                throw new Error(response.statusText)
            } else {
                Loading.remove()
                Notify.success('File Confirmed Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        } else if (props.fileLocation == 'Commissioner') {
            const newfiledata = {
                fileNumber: filenumber,
                fileLocation: props.fileLocation,
                dateGroupReceived: null,
                dateDBReceived: null,
                dateCommissonerReceived: new Date(),
                datePSReceived: null
            }

            const record = await fetch('/api/count/allfiles', {
                method: 'POST'
            })

            const response = await fetch('/api/confirm', {
                method: 'POST',
                body: JSON.stringify(newfiledata)
            })

            const log = await fetch('/api/log', {
                method: 'POST',
                body: JSON.stringify(activity)
            })

            const notify = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(notice)
            })


            if (!response.ok || !log.ok || !record.ok || !notify.ok) {
                Loading.remove()
                Notify.failure(response.statusText)
                throw new Error(response.statusText)
            } else {
                Loading.remove()
                Notify.success('File Confirmed Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }

            return await response.json()

        }

        const record = await fetch('/api/count/allfiles', {
            method: 'POST'
        })

        console.log(record.json());



    }
    return (
        <form id={styles["action_modal"]} className="flex fixed z-10 flex-col gap-8 px-12 py-20 bg-white overflow-y-scroll">
            <h1 className='font-bold'>FILE DETAILS</h1>
            <div className='flex gap-8'>
                <div className='flex flex-col gap-8'>
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

                </div>

                <div className='flex flex-col gap-8'>
                    <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                        <label htmlFor="file_number">File Number</label>
                        <input type="text" name="file_number" id="file_number" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.number} />
                    </fieldset>

                    <fieldset className='flex flex-col gap-4 w-96' style={{ width: '560px' }}>
                        <label htmlFor="amount">Amount</label>
                        <input type="text" name="amount" id="amount" disabled className="box-border border-2 border-solid border-gray-300 outline-none  flex gap-2 rounded-lg w-full bg-gray-300 text-base font-medium px-4 py-4" style={{ outline: 'none' }} placeholder={props.amount} />
                    </fieldset>

                </div>

            </div>


            <fieldset className='flex gap-4 w-full justify-end' id='button_holder'>
                <Button onclick={props.cancel}>
                    Close
                </Button>
                <Button onclick={dothething}>
                    Confirm File
                    <Image src={sendIcon} alt='' />
                </Button>
            </fieldset>
        </form>
    )
}