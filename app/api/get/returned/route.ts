import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';


export async function GET(request: Request) {
  noStore();
  try {
    const result = await sql`SELECT MDA, AssignedGroup , FileTitle, FileNumber, FileAmount, DateReturnedToRegistry, FileLocation, ActionTaken from FILES where actiontaken='Returned'`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}