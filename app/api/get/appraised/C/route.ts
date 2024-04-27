import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';


export async function GET(request: Request) {
  noStore();
  const { searchParams } = new URL(request.url);
  const group = searchParams.get('group');
  try {
    const result = await sql`SELECT MDA , FileTitle, FileNumber, FileAmount, DateGroupReceieved, ActionTaken from FILES where actiontaken='Appraised' and assignedgroup='C'`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}