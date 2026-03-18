import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CreditCard, 
  Settings 
} from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">InvoiceFlow</h1>
          <p className="text-sm text-gray-400 mt-1">{user.company.name}</p>
        </div>
        
        <nav className="px-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/invoices"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <FileText size={20} />
            Invoices
          </Link>
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Users size={20} />
            Clients
          </Link>
          <Link
            href="/dashboard/payments"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <CreditCard size={20} />
            Payments
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Welcome, {user.firstName}!
            </h2>
          </div>
          <UserButton />
        </header>
        
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
