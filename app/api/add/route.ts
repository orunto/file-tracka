import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result =
      await sql`INSERT INTO Files ( MDA, AssignedGroup , FileTitle, FileNumber, FileAmount, DateAssigned, ActionTaken ) VALUES ('B.I.T', 'A', 'Miscellaneous', '091210121', '100,000,000', '11/11/11', 'Assigned');`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}