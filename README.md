# InvoiceFlow - Multi-Tenant Invoice Management SaaS

A professional, multi-tenant SaaS application for managing invoices, clients, and payments. Built with Next.js 14, TypeScript, Prisma, and Clerk authentication.

## ✨ Features

### Multi-Tenant Architecture
- ✅ **Complete data isolation** - Each company only sees their own data
- ✅ **Row-level security** - All queries scoped by `companyId`
- ✅ **Tenant context middleware** - Automatic tenant isolation
- ✅ **Secure authentication** - Clerk-based auth with company association

### Core Functionality
- 📄 **Invoice Management** - Create, edit, and track invoices
- 👥 **Client Management** - Manage client information and history
- 💰 **Payment Tracking** - Monitor payments and outstanding balances
- 📊 **Dashboard Analytics** - Real-time business insights
- 🔢 **Automatic Calculations** - Subtotals, taxes, and totals
- 📋 **Line Items** - Add multiple items to each invoice

## 🏗️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Clerk
- **UI Components:** Shadcn/ui + Tailwind CSS
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd invoice-saas
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/invoiceflow"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. **Run the development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Models
- **User** - User accounts (linked to Clerk)
- **Company** - Tenant/company profiles
- **Client** - Customer information (tenant-scoped)
- **Invoice** - Invoice records (tenant-scoped)
- **InvoiceItem** - Line items for invoices
- **Payment** - Payment records

### Multi-Tenant Design
All data models include `companyId` for tenant isolation:
```prisma
model Invoice {
  id          String   @id @default(cuid())
  companyId   String   // Tenant identifier
  // ... other fields
  
  @@index([companyId])
}
```

## 🛣️ Routes

### Public Routes
- `/` - Landing page
- `/sign-in` - Login
- `/sign-up` - Registration
- `/onboarding` - Company setup

### Protected Routes (Tenant-Scoped)
- `/dashboard` - Analytics dashboard
- `/dashboard/invoices` - Invoice list
- `/dashboard/invoices/new` - Create invoice
- `/dashboard/invoices/[id]` - View/edit invoice
- `/dashboard/clients` - Client list
- `/dashboard/clients/new` - Add client
- `/dashboard/clients/[id]` - View/edit client
- `/dashboard/payments` - Payment history
- `/dashboard/settings` - Settings

## 🔒 Security Features

1. **Authentication** - Clerk-based secure authentication
2. **Tenant Isolation** - Middleware enforces company-scoped access
3. **Server Actions** - All mutations use server-side validation
4. **Type Safety** - Full TypeScript coverage
5. **SQL Injection Prevention** - Prisma ORM parameterized queries

## 🚀 Deployment to Vercel

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables from `.env`
- Deploy!

3. **Set up database:**
```bash
# After deployment, run migrations
npx prisma migrate deploy
```

## 📝 Environment Variables for Vercel

Add these in your Vercel project settings:

```
DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
NEXT_PUBLIC_APP_URL
```

## 🧪 Testing Multi-Tenancy

1. Create two separate accounts
2. Create clients and invoices in each account
3. Verify that data is completely isolated
4. Try to access another tenant's invoice by ID (should fail)

## 📚 Key Concepts

### Multi-Tenant Implementation

**Server Actions with Tenant Isolation:**
```typescript
export async function getInvoices() {
  const { companyId } = await requireCompany()
  
  return prisma.invoice.findMany({
    where: { companyId }, // Automatic tenant filtering
    // ...
  })
}
```

**Middleware Protection:**
```typescript
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})
```

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migrations
npx prisma db push       # Push schema changes
```

## 📖 Future Enhancements

- [ ] Email invoice delivery
- [ ] PDF generation and download
- [ ] Recurring invoices
- [ ] Multi-currency support
- [ ] Advanced analytics
- [ ] Team members and roles
- [ ] API access
- [ ] Payment gateway integration (Stripe)
- [ ] Automated payment reminders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication
- Prisma for the awesome ORM
- Shadcn for the beautiful UI components

---

**Built with ❤️ using Next.js and deployed on Vercel**
