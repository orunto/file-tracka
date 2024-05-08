
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const fileInfo = JSON.parse(req.body)

    const newfile = await prisma.filerecords.updateMany({
        where: {
            fileNumber: fileInfo.fileNumber
        },
        data : {
            actionTaken: fileInfo.actionTaken,
            dateApproved: fileInfo.dateApproved,
            dateReturnedtoRegistry: fileInfo.dateReturnedtoRegistry,
            fileLocation: fileInfo.fileLocation
        }
    })

    res.json(newfile)
}