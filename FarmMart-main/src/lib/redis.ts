import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export async function getRedisClient() {
  const client = createClient({
    url: redisUrl,
  });

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();
  return client;
}

export async function setCache(key: string, value: unknown, ttlSeconds: number = 300) {
  let client;
  try {
    client = await getRedisClient();
    await client.setEx(key, ttlSeconds, JSON.stringify(value));
  } catch (error) {
    console.error('Redis set error:', error);
  } finally {
    if (client) await client.quit();
  }
}

export async function getCache(key: string) {
  let client;
  try {
    client = await getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  } finally {
    if (client) await client.quit();
  }
}

export async function deleteCache(key: string) {
  let client;
  try {
    client = await getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Redis delete error:', error);
  } finally {
    if (client) await client.quit();
  }
}
