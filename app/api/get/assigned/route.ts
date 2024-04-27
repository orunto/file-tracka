import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT MDA, AssignedGroup , FileTitle, FileNumber, FileAmount, DateAssigned, ActionTaken from FILES where actiontaken='Assigned'`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}