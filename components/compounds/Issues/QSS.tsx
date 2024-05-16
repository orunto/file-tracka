'use client'

import TableConsole from "@/components/molecules/TableConsole"
import eyeIcon from '@/public/icons/mdi_eye.svg'
import Image from "next/image"
import DetailsModal from "@/components/molecules/DetailsModal"
import { useState } from "react"
import TablesToggle from "@/components/molecules/TablesToggle"
import AcceptModal from "@/components/molecules/AcceptModal"
import { useUser } from "@auth0/nextjs-auth0/client"
import ActionModal from "@/components/molecules/ActionModal"
import COMActionModal from '@/components/molecules/COMActionModal'
import DBActionModal from '@/components/molecules/DBActionModal'
import PSActionModal from '@/components/molecules/PSActionModal'
import { Notify } from "notiflix"
import styles from '@/styles/components.module.scss'

interface props {
    unresolved: {
        location: any,
        issue: any,
        fileNumber: any,
        status: any,
        dateIn: any,
        dateOut: any
    }[],
    review: {
        location: any,
        issue: any,
        fileNumber: any,
        status: any,
        dateIn: any,
        dateOut: any
    }[],
    resolved: {
        location: any,
        issue: any,
        fileNumber: any,
        status: any,
        dateIn: any,
        dateOut: any
    }[],
}

export default function Issues(props: props) {
    return (
        <section className="flex gap-10 w-full h-screen box-border">
            <div id={styles["unresolved"]} className="box-border w-full flex flex-col gap-10">
                <header style={{ background: '#88C6A0' }} className="box-border w-full px-10 py-4 font-semibold text-base">Unresolved</header>

                <div>

                    {
                        props.unresolved.map((clone, i) => (
                            <>
                                <header key={i} style={{ background: '#88C6A0' }} className="box-border w-full px-10 py-4 font-semibold text-base">{clone.location}</header>

                                <article key={i} className="w-full box-border px-10 py-4 flex flex-col gap-3">
                                    <p><b>Issue:</b> {clone.issue}</p>
                                    <p><b>File Number:</b> {clone.fileNumber}</p>
                                    <p><b>Status:</b> {clone.status}</p>
                                    <p><b>Date Recieved:</b> {clone.dateIn}</p>
                                    <p><b>Date Recieved:</b> {clone.dateOut}</p> 
                                </article>
                            </>
                        ))
                    }
                </div>
            </div>

            <div id={styles["review"]} className="w-full flex flex-col">
                <header style={{ background: '#FFF48C' }} className="box-border w-full px-10 py-4 font-semibold text-base">Under Review</header>
                {
                    props.review.map((clone, i) => (
                        <>
                            <header key={i} style={{ background: '#88C6A0' }} className="box-border w-full px-10 py-4 font-semibold text-base">{clone.location}</header>

                            <article key={i} className="w-full box-border px-10 py-4 flex flex-col gap-3">
                                <p><b>Issue:</b> {clone.issue}</p>
                                <p><b>File Number:</b> {clone.fileNumber}</p>
                                <p><b>Status:</b> {clone.status}</p>
                                <p><b>Date Recieved:</b> {clone.dateIn}</p>
                                <p><b>Date Recieved:</b> {clone.dateOut}</p> 
                            </article>
                        </>
                    ))
                }
            </div>

            <div id={styles["resolved"]} className="w-full flex flex-col">
                <header style={{ background: '#00FFA3' }} className="box-border w-full px-10 py-4 font-semibold text-base">Resolved</header>

                {
                        props.resolved.map((clone, i) => (
                            <>
                                <header key={i} style={{ background: '#88C6A0' }} className="box-border w-full px-10 py-4 font-semibold text-base">{clone.location}</header>

                                <article key={i} className="w-full box-border px-10 py-4 flex flex-col gap-3">
                                    <p><b>Issue:</b> {clone.issue}</p>
                                    <p><b>File Number:</b> {clone.fileNumber}</p>
                                    <p><b>Status:</b> {clone.status}</p>
                                    <p><b>Date Recieved:</b> {clone.dateIn}</p>
                                    <p><b>Date Recieved:</b> {clone.dateOut}</p> 
                                </article>
                            </>
                        ))
                    }
            </div>
        </section>
    )
}