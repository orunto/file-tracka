
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const assigned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Assigned' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateAssigned: true,
            actionTaken: true,
        }
    });
    const completed = await prisma.filerecords.findMany({
        where: { actionTaken: 'Completed' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateReturnedtoRegistry: true,
            actionTaken: true,
        }
    });
    const returned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Returned' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            fileLocation: true,
            dateReturnedtoRegistry: true,
            actionTaken: true,
        }
    });
    const out = await prisma.filerecords.findMany({
        where: { actionTaken: 'Back to MDA' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            dateReturnedtoMDA: true,
            actionTaken: true,
        }
    });
    return {
        props: {
            assigned: JSON.parse(JSON.stringify(assigned)),
            completed: JSON.parse(JSON.stringify(completed)),
            returned: JSON.parse(JSON.stringify(returned)),
            out: JSON.parse(JSON.stringify(out)),
        },
        revalidate: 10,
    };
}