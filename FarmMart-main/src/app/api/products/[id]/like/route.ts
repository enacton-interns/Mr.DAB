import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product'; 
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db'; 

interface DecodedToken extends jwt.JwtPayload {
  userId: string;
}

// Helper function to verify JWT and get user ID
async function getUserIdFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect(); 

  const userId = await getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated or invalid token.' }, { status: 401 });
  }

  try {
    const productId = params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    if (!product.likes) {
      product.likes = []; // Initialize if not present
    }

    if (!product.likes.includes(userId)) {
      product.likes.push(userId);
      await product.save();
      return NextResponse.json({ message: 'Product liked.', product }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Product already liked by this user.' }, { status: 409 });
    }
  } catch (error) {
    console.error('API error (POST /like):', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE handler for unliking a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect(); // Connect to your database

  const userId = await getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated or invalid token.' }, { status: 401 });
  }

  try {
    const productId = params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    if (!product.likes) {
      product.likes = []; // Should ideally be initialized on creation, but good for safety
    }

    const index = product.likes.indexOf(userId);
    if (index > -1) {
      product.likes.splice(index, 1);
      await product.save();
      return NextResponse.json({ message: 'Product unliked.', product }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Product not liked by this user.' }, { status: 409 });
    }
  } catch (error) {
    console.error('API error (DELETE /like):', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}