// src/app/api/products/liked/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product'; 
import { getUserFromRequest } from '@/lib/auth'; 
import dbConnect from '@/lib/db'; 

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); 

    const userPayload = getUserFromRequest(request);

    if (!userPayload) {
      return NextResponse.json({ error: 'Not authenticated or invalid token.' }, { status: 401 });
    }

    const userId = userPayload.userId;
    
    const likedProducts = await Product.find({ likes: userId })
      .populate('farmer', 'name')
      .sort({ createdAt: -1 }) 
      .lean();

    return NextResponse.json({ products: likedProducts }, { status: 200 });

  } catch (error) {
    console.error('API Error (GET /api/products/liked):', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
