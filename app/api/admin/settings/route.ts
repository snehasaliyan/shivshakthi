import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const updateData: any = {};
    let emailChanged = false;

    // Handle Name and Email updates
    if (name || email) {
      if (name) updateData.name = name;
      
      if (email && email !== user.email) {
        // Check if new email is already taken by someone else
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return NextResponse.json({ success: false, error: 'Email address is already in use' }, { status: 400 });
        }
        updateData.email = email;
        emailChanged = true;
      }
    }

    // Handle Password update
    if (currentPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ success: false, error: 'Incorrect current password' }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // Only update if there are changes
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { email: session.user.email },
        data: updateData,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Settings updated successfully',
      emailChanged 
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
