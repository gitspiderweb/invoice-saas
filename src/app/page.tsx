import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Users, DollarSign, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">InvoiceFlow</h1>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Professional Invoice Management
          <br />
          <span className="text-blue-600">For Your Business</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Multi-tenant SaaS platform for managing invoices, clients, and payments. 
          Secure, isolated, and professional-grade.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Free Trial
          </Button>
        </Link>
      </section>
      
      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why InvoiceFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Invoice Management</h3>
            <p className="text-gray-600">
              Create, track, and manage invoices with ease
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Users className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Client Tracking</h3>
            <p className="text-gray-600">
              Manage all your clients in one place
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <DollarSign className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
            <p className="text-gray-600">
              Monitor payments and outstanding invoices
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Shield className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Isolated</h3>
            <p className="text-gray-600">
              Multi-tenant architecture with data isolation
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <p className="text-center text-gray-600">
          © 2026 InvoiceFlow. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
