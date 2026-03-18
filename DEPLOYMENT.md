# Deployment Guide for InvoiceFlow

## Prerequisites

Before deploying, you need:
1. A GitHub account
2. A Vercel account (free tier is fine)
3. A PostgreSQL database (recommended: Neon or Supabase - both have free tiers)
4. A Clerk account for authentication (free tier available)

---

## Step 1: Set Up PostgreSQL Database

### Option A: Neon (Recommended)

1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)
5. Save this for later

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Project Settings > Database
5. Copy the "Connection string" (Transaction mode)
6. Save this for later

### Option C: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb invoiceflow

# Your connection string:
postgresql://localhost:5432/invoiceflow
```

---

## Step 2: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com)
2. Create a free account
3. Create a new application
4. Go to "API Keys" in the dashboard
5. Copy both:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
6. Save these for later

---

## Step 3: Update Environment Variables

Update your `.env` file with the real credentials:

```env
# Replace with your actual PostgreSQL connection string
DATABASE_URL="postgresql://user:pass@host/db"

# Replace with your Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxx"
CLERK_SECRET_KEY="sk_test_xxxxx"

# These should already be set correctly
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Step 4: Initialize Database

Once you have a database set up:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Verify database is set up
npx prisma studio
# This opens a GUI to view your database
```

---

## Step 5: Test Locally

```bash
# Run the development server
npm run dev

# Open http://localhost:3000
# You should see the landing page
# Try signing up and creating a company
```

---

## Step 6: Push to GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Multi-tenant invoice SaaS"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/invoice-saas.git
git branch -M main
git push -u origin main
```

---

## Step 7: Deploy to Vercel

### Via Vercel Dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" > "Project"
4. Import your `invoice-saas` repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Build Command:** `prisma generate && next build`
   - **Install Command:** `npm install`

6. Add Environment Variables (click "Environment Variables"):
   ```
   DATABASE_URL = your-production-database-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_xxxxx
   CLERK_SECRET_KEY = sk_live_xxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /onboarding
   NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
   ```

7. Click "Deploy"

### Via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Step 8: Run Production Migrations

After deploying to Vercel, you need to run migrations on your production database:

```bash
# Set DATABASE_URL to your production database
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
vercel env pull  # Downloads production env vars
npx prisma migrate deploy
```

---

## Step 9: Update Clerk Settings

In your Clerk dashboard:

1. Go to "Domains"
2. Add your Vercel domain: `your-app.vercel.app`
3. Go to "Paths" and configure:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/onboarding`

---

## Step 10: Test Production

1. Visit your Vercel URL
2. Sign up for a new account
3. Complete the onboarding (creates company)
4. Create a client
5. Create an invoice
6. Add line items
7. Log out and create a second account
8. Verify that data is completely isolated

---

## Troubleshooting

### Database Connection Issues

```bash
# Test your connection string
npx prisma db pull
```

### Build Fails on Vercel

- Make sure `prisma generate` is in the build command
- Check environment variables are set correctly
- Check build logs for specific errors

### Authentication Not Working

- Verify Clerk keys are correct
- Check that your domain is added in Clerk dashboard
- Make sure redirect URLs match exactly

### Data Not Showing

- Check that migrations ran successfully
- Verify user was created during onboarding
- Check Prisma Studio to view data directly

---

## Production Checklist

- ✅ PostgreSQL database created
- ✅ Database connection string updated
- ✅ Clerk authentication configured
- ✅ All environment variables set in Vercel
- ✅ Migrations run on production database
- ✅ Clerk domain and paths configured
- ✅ Application tested with multiple accounts
- ✅ Multi-tenancy verified (data isolation works)

---

## Continuous Deployment

Once set up, any push to `main` branch will automatically:
1. Build the application
2. Run tests (if configured)
3. Deploy to production

For database changes:
1. Create migration locally: `npx prisma migrate dev --name description`
2. Commit and push the migration files
3. After deployment, run: `npx prisma migrate deploy` on production

---

## Monitoring & Maintenance

- **Logs:** Check Vercel dashboard for runtime logs
- **Database:** Use Prisma Studio or your provider's dashboard
- **Performance:** Monitor Vercel Analytics
- **Errors:** Set up error tracking (Sentry, etc.)

---

**🎉 Congratulations! Your multi-tenant invoice SaaS is now live!**
