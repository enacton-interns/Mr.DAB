import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import ServiceProvider from '@/models/ServiceProvider';
import { logger } from '@/lib/logger';

const getActiveProviders = unstable_cache(
  async () => {
    await dbConnect();

    const providers = await ServiceProvider.find({
      availability: true,
      subscriptionStatus: 'active'
    })
      .populate('userId', 'name email contact')
      .lean();

    return providers.map(provider => ({
      _id: provider._id,
      userId: provider.userId,
      skills: provider.skills,
      availability: provider.availability,
      rating: provider.rating,
      subscriptionStatus: provider.subscriptionStatus
    }));
  },
  ['providers'],
  { revalidate: 3600, tags: ['providers'] }
);

export async function GET() {
  try {
    const providersWithUserData = await getActiveProviders();
    return NextResponse.json(providersWithUserData);
  } catch (error) {
    logger.error({ error }, 'Error fetching providers');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
