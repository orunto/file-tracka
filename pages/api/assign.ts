/* eslint-disable import/no-anonymous-default-export */
// import { PrismaClient } from "@prisma/client/extension";
// const prisma = new PrismaClient()

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Not allowed' })
    }

    const fileInfo = JSON.parse(req.body)

    const newfile = await prisma.filerecords.create({
        data: fileInfo  
    })

    res.json(newfile)
}