import { getClients } from '@/app/actions/client'
import { createInvoice } from '@/app/actions/invoice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewInvoicePage() {
  const clients = await getClients()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/invoices">
          <Button variant="outline" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Invoice</h1>
          <p className="text-gray-700 mt-1">Create a new invoice</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>Enter the basic invoice information</CardDescription>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You need to create a client first</p>
              <Link href="/dashboard/clients">
                <Button>Go to Clients</Button>
              </Link>
            </div>
          ) : (
            <form action={createInvoice} className="space-y-4">
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-900 mb-1">
                  Client *
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-900 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Any additional notes..."
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">Create Invoice</Button>
                <Link href="/dashboard/invoices">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
