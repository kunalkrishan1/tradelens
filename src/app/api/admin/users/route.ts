import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  const currentUser = await getSessionUser(req);

  if (!currentUser) {
    return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
  }

  // Strict Role-Based Authorization
  if (currentUser.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Admin privileges required.' },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();
    const users = await User.find({}, '-password').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        total: users.length,
        users,
      },
    });
  } catch (error: unknown) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

