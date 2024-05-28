/* eslint-disable import/no-anonymous-default-export */
// import { PrismaClient } from "@prisma/client/extension";
// const prisma = new PrismaClient()

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const total = await prisma.filerecords.count()
    const completed = await prisma.filerecords.count({ where: { actionTaken: 'Completed' } })
    const assigned = await prisma.filerecords.count({ where: { actionTaken: 'Assigned' } })
    const approved = await prisma.filerecords.count({ where: { actionTaken: 'Approved' } })
    const appraised = await prisma.filerecords.count({ where: { actionTaken: 'Appraised' } })
    const accepted = await prisma.filerecords.count({ where: { actionTaken: 'Accepted' } })
    const returned = await prisma.filerecords.count({ where: { actionTaken: 'Returned' } })

    const dateRecord = new Date()

    const newday = await prisma.dailySummary.upsert({
        create: {
            date: new Date(),
            day: dateRecord.getDate(),
            numberOfFiles: total,
            completed: completed,
            pending: assigned + approved + accepted + appraised,
            returned: returned
        },
        where: {
            day: dateRecord.getDate(),
        },
        update: {
            numberOfFiles: total + 1,
            completed: completed,
            pending: (assigned + approved + accepted + appraised) + 1,
            returned: returned
        }
    })

    res.json(newday)
}