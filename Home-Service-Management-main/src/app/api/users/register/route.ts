import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['customer', 'provider']),
  address: z.string().optional(),
  contact: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = RegisterSchema.parse(await request.json());

    const { name, email, password, role, address, contact } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      address,
      contact,
    });

    await user.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
