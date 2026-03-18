import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { requireCompany } from '@/lib/auth'
import { formatCurrency } from '@/lib/utils'
import { FileText, Users, DollarSign, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const { companyId } = await requireCompany()
  
  // Get stats
  const [totalInvoices, totalClients, invoices] = await Promise.all([
    prisma.invoice.count({ where: { companyId } }),
    prisma.client.count({ where: { companyId } }),
    prisma.invoice.findMany({
      where: { companyId },
      include: { client: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])
  
  const totalRevenue = await prisma.invoice.aggregate({
    where: { companyId, status: 'PAID' },
    _sum: { total: true },
  })
  
  const pendingAmount = await prisma.invoice.aggregate({
    where: { companyId, status: { in: ['SENT', 'OVERDUE'] } },
    _sum: { total: true },
  })
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-700 mt-1">Overview of your business</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalInvoices}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalClients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(Number(totalRevenue._sum.total) || 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">Pending Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(Number(pendingAmount._sum.total) || 0)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-900">Recent Invoices</CardTitle>
          <CardDescription className="text-sm text-gray-600">Your latest invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No invoices yet</p>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/dashboard/invoices/${invoice.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">{invoice.client.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(Number(invoice.total))}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
