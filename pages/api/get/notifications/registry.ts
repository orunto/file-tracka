
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const assigned = await prisma.notifications.findMany({
        where: {
            for: 'Registry'
        },
        select: {
            message: true
        }
    });

    res.json(assigned)
}