import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, companyName, email, phone, region, threadType, colorCode, message, action } = body;

    const request = await prisma.quoteRequest.create({
      data: {
        fullName,
        companyName,
        email,
        phone,
        region,
        threadType,
        colorCode,
        message,
        action,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, data: request }, { status: 201 });
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit request' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // In a real app we would check the session here.
  // For the admin dashboard to fetch quotes.
  try {
    const requests = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: requests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quote requests:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  // Update status
  try {
    const body = await req.json();
    const { id, status } = body;

    const updated = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
  }
}
