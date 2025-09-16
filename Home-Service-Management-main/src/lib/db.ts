  import mongoose,{ Mongoose } from 'mongoose';

  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  }

  // Extend the NodeJS Global type to avoid TypeScript errors
  declare global {
    var mongoose: MongooseCache;
  }

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  async function dbConnect() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  }

  export default dbConnect;
