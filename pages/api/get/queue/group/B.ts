
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const assigned = await prisma.filerecords.findMany({
        where: { actionTaken: 'Assigned', assignedGroup: 'B', fileLocation: 'Group' },
        select: {
            mda: true,
            assignedGroup: true,
            fileTitle: true,
            fileNumber: true,
            fileAmount: true,
            groupDays: true,
            dateGroupReceived: true,
            actionTaken: true,
            fileLocation: true
        }
    });

    res.json(assigned)
}