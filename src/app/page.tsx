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
