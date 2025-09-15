# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/local-farmers-marketplace

# Redis Connection (for production, use a cloud Redis like Upstash)
REDIS_URL=redis://localhost:6379

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Stripe Configuration (optional for testing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Quick Setup

### 1. Create the .env.local file:

```bash
# Windows PowerShell
New-Item -Path ".env.local" -ItemType File

# Or manually create the file in your project root
```

### 2. Add the content above to the file

### 3. For Stripe (Optional):

- Sign up at [stripe.com](https://stripe.com)
- Go to Developers → API keys
- Copy your test keys (sk*test*... and pk*test*...)

### 4. Generate JWT Secret:

```bash
# Generate a random string for JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ✅ Testing Without Stripe

If you don't want to set up Stripe right now, you can:

1. Leave the Stripe keys empty
2. The app will work but show a warning about Stripe being disabled
3. Orders will be created with "pending" payment status

## 🔄 Restart Required

After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## 🚀 Vercel Deployment

### 1. Environment Variables in Vercel

When deploying to Vercel, set these environment variables in your Vercel dashboard:

- `MONGODB_URI`: Your MongoDB connection string
- `REDIS_URL`: Your Redis connection string (see below)
- `JWT_SECRET`: Your JWT secret key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `NEXTAUTH_SECRET`: Your NextAuth secret
- `NEXTAUTH_URL`: Your production URL

### 2. Redis Setup for Production

Since Vercel doesn't provide Redis, use a cloud Redis service:

#### Option A: Upstash Redis (Recommended)
1. Sign up at [upstash.com](https://upstash.com)
2. Create a Redis database
3. Copy the connection URL
4. Set `REDIS_URL` to your Upstash Redis URL

#### Option B: Redis Cloud
1. Sign up at [redis.com](https://redis.com)
2. Create a Redis database
3. Get the connection URL
4. Set `REDIS_URL` to your Redis Cloud URL

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect to GitHub for automatic deployments
vercel --prod
```

### 4. Database Setup

Make sure your MongoDB database is accessible from Vercel's IP addresses. For MongoDB Atlas:
1. Go to Network Access
2. Add IP: `0.0.0.0/0` (allow all) or specific Vercel IP ranges
