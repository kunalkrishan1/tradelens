import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { toSafeUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, firstName = '', lastName = '' } = body;

    // 1. Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Username, email, and password are required.' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedUsername.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Username must be at least 3 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 2. Check for duplicate username or email
    const existingUser = await User.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedEmail }],
    });

    if (existingUser) {
      if (existingUser.username === trimmedUsername) {
        return NextResponse.json(
          { success: false, message: 'This username is already taken.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // 3. Create user
    const newUser = new User({
      username: trimmedUsername,
      email: trimmedEmail,
      password, // Pre-save hook hashes it
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: 'user',
      isActive: true,
      isEmailVerified: false,
      mustChangePassword: false,
    });

    await newUser.save();

    // 4. Generate JWT
    const safeUser = toSafeUser(newUser);
    const token = signToken({
      sub: safeUser.id,
      role: safeUser.role,
      username: safeUser.username,
      email: safeUser.email,
    });

    // 5. Response with HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully.',
        data: {
          user: safeUser,
          token,
        },
      },
      { status: 201 }
    );

    response.cookies.set('tradelens_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error: unknown) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed due to a server error. Please try again.' },
      { status: 500 }
    );
  }
}

