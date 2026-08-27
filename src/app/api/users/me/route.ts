import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      profile: user,
    },
  });
}

