import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Files ( fileid UUID PRIMARY KEY DEFAULT gen_random_uuid(), MDA varchar(255), AssignedGroup varchar(255), FileTitle varchar(255), FileNumber varchar(255), FileAmount varchar(255), DateAssigned date, ActionTaken varchar(255), FileLocation varchar(255), DateAppraised date, DateDBRecommended date, DatePSRecommended date, DateApproved date, DateRejected date, DateReturnedtoGroup date, DateReturnedtoRegistry date, DateReturnedtoMDA date, DateGroupReceieved date, DateDBReceieved date, DatePSReceieved date, DateCommissionerReceieved date );`;

      await sql` CREATE TABLE ActivityLogs ( UserName varchar(255), ActionTime timestamp, ActionPerformed varchar(255) )`
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}