import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. No active session.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error: unknown) {
    console.error('Auth /me Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to authenticate user session.' },
      { status: 500 }
    );
  }
}

