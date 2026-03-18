import { getClient, updateClient, deleteClient } from '@/app/actions/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{client.name}</h1>
          <p className="text-gray-600 mt-1">Client details</p>
        </div>
        <form action={deleteClient.bind(null, id)}>
          <Button type="submit" variant="destructive">Delete Client</Button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateClient.bind(null, id)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={client.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  defaultValue={client.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={client.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  defaultValue={client.address || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <Button type="submit">Update Client</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Client invoice history</CardDescription>
          </CardHeader>
          <CardContent>
            {client.invoices.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No invoices yet</p>
            ) : (
              <div className="space-y-3">
                {client.invoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{formatDate(invoice.issueDate)}</p>
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
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
