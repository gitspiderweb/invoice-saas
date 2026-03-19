import { getInvoices } from '@/app/actions/invoice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function InvoicesPage() {
  const invoices = await getInvoices()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-700 mt-1">Manage your invoices</p>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button className="text-gray-900">
            <Plus size={20} />
            New Invoice
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">All Invoices</CardTitle>
          <CardDescription className="text-gray-600">A list of all your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No invoices yet</p>
              <Link href="/dashboard/invoices/new">
                <Button className="text-gray-900">Create Your First Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold text-gray-900">Invoice #</th>
                    <th className="pb-3 font-semibold text-gray-900">Client</th>
                    <th className="pb-3 font-semibold text-gray-900">Issue Date</th>
                    <th className="pb-3 font-semibold text-gray-900">Due Date</th>
                    <th className="pb-3 font-semibold text-gray-900">Amount</th>
                    <th className="pb-3 font-semibold text-gray-900">Status</th>
                    <th className="pb-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-0">
                      <td className="py-3 text-gray-600">{invoice.invoiceNumber}</td>
                      <td className="py-3 text-gray-600">{invoice.client.name}</td>
                      <td className="py-3 text-gray-600">{formatDate(invoice.issueDate)}</td>
                      <td className="py-3 text-gray-600">{formatDate(invoice.dueDate)}</td>
                      <td className="py-3 font-semibold text-gray-900">{formatCurrency(Number(invoice.total))}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                          invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <Link href={`/dashboard/invoices/${invoice.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
