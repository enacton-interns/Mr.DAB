import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User'; 
import jwt, { JwtPayload } from 'jsonwebtoken';
import dbConnect from '@/lib/db';

export const dynamic = 'force-dynamic';

interface DecodedToken extends JwtPayload {
  userId: string;
}


async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return decoded.userId;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); 
    const userId = await getUserIdFromToken(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Authentication failed. Please log in.' }, { status: 401 });
    }

    const user = await User.findById(userId).select('-password'); 
    
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('API Error (GET /api/profile):', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: 'Authentication failed. Please log in.' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, address } = body;
    
    if (!name || !phone || !address || !address.street || !address.city || !address.state || !address.zipCode) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        phone, 
        address 
      },
      { new: true, runValidators: true } 
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('API Error (PUT /api/profile):', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}