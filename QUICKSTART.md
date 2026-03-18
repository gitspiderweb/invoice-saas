# Quick Start Guide

This guide helps you get InvoiceFlow running locally in under 10 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed

## Steps

### 1. Clone and Install

```bash
cd invoice-saas
npm install
```

### 2. Get Your Free Database (Choose One)

**Option A: Neon (Easiest)**
1. Visit https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string

**Option B: Use Local Prisma Dev**
```bash
# This creates a local database automatically
npx prisma dev
# Copy the connection string it provides
```

### 3. Get Clerk Auth Keys

1. Visit https://clerk.com
2. Sign up (free)
3. Create application
4. Copy API keys from dashboard

### 4. Configure Environment

Update `.env`:
```env
DATABASE_URL="your-database-url-here"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"
```

### 5. Set Up Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Run the App

```bash
npm run dev
```

Visit http://localhost:3000

### 7. Test It Out

1. Click "Get Started"
2. Sign up with your email
3. Create your company
4. Add a client
5. Create an invoice
6. Add line items

**Done! 🎉**

## Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Common Issues

**"Can't reach database"**
- Check your DATABASE_URL is correct
- Make sure database is running (if local)

**"Unauthorized" errors**
- Verify Clerk keys are set in .env
- Restart dev server after changing .env

**Build errors**
- Run `npm install` again
- Delete `node_modules` and `.next`, then reinstall

## Need Help?

- Check the [README.md](./README.md) for full documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
