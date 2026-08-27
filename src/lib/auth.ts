import { cookies } from 'next/headers';
import { verifyToken, JwtPayload } from './jwt';
import connectToDatabase from './mongodb';
import User, { IUser } from '@/models/User';

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
}

export function toSafeUser(user: IUser): AuthenticatedUser {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified,
    mustChangePassword: user.mustChangePassword,
    createdAt: user.createdAt,
  };
}

export async function getSessionUser(req?: Request): Promise<AuthenticatedUser | null> {
  let token: string | null = null;

  // 1. Try reading from HTTP-only cookie
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('tradelens_token')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  } catch (e) {
    // cookies() might not be available in some contexts
  }

  // 2. Try reading from Authorization Header (Bearer token)
  if (!token && req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return null;
  }

  const payload: JwtPayload | null = verifyToken(token);
  if (!payload || !payload.sub) {
    return null;
  }

  try {
    await connectToDatabase();
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return null;
    }
    return toSafeUser(user);
  } catch (error) {
    console.error('Error in getSessionUser:', error);
    return null;
  }
}

