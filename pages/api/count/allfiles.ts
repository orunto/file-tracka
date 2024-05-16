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
    const completed = await prisma.filerecords.count({where: {actionTaken: 'Completed'}})
    const pending = await prisma.filerecords.count({where: {actionTaken: 'Assigned' || 'Approved' || 'Appraised' || 'Recommended' || 'Accepted'}})
    const returned = await prisma.filerecords.count({where: {actionTaken: 'Returned'}})

    const dateRecord = new Date()

    const newday = await prisma.dailySummary.upsert({
        create: {
            date: new Date(),
            numberOfFiles: total,
            completed: completed,
            pending: pending,
            returned: returned
        },
        where: {
            date: new Date(),
        },
        update: {}
    })

    res.json(newday)
}