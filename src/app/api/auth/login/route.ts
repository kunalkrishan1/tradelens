import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { toSafeUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const identifier = (username || email || '').trim().toLowerCase();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: 'Please enter your username/email and password.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. Please check your username/email and password.' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Your account has been deactivated. Please contact support.' },
        { status: 403 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials. Please check your username/email and password.' },
        { status: 401 }
      );
    }

    const safeUser = toSafeUser(user);
    const token = signToken({
      sub: safeUser.id,
      role: safeUser.role,
      username: safeUser.username,
      email: safeUser.email,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: safeUser,
        token,
      },
    });

    response.cookies.set('tradelens_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed due to a server error.' },
      { status: 500 }
    );
  }
}

