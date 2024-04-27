import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface props {
  mda: any,
  assignedgroup: any,
  filetitle: any,
  filenumber: any,
  fileamount: any,
  dateassigned: any,
  actiontaken: any
}
export async function GET(request: Request, props: props) {
  const { searchParams } = new URL(request.url);
  const mda = searchParams.get('mda');
  const assignedgroup = searchParams.get('assignedgroup');
  const filetitle = searchParams.get('filetitle');
  const filenumber = searchParams.get('filenumber');
  const dateassigned = searchParams.get('dateassigned');
  const fileamount = searchParams.get('fileamount');
  const actiontaken = searchParams.get('actiontaken');

  try {
    const result =
      await sql`INSERT INTO Files ( MDA, AssignedGroup , FileTitle, FileNumber, FileAmount, DateAssigned, ActionTaken ) VALUES (${mda}, ${assignedgroup}, ${filetitle}, ${filenumber}, ${fileamount}, (to_timestamp(${dateassigned})), ${actiontaken});`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}