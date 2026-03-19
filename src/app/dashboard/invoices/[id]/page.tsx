import { getInvoice, addInvoiceItem, deleteInvoiceItem, updateInvoice, deleteInvoice } from '@/app/actions/invoice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/invoices">
          <Button variant="outline" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
          <p className="text-gray-700 mt-1">Invoice details</p>
        </div>
        <form action={deleteInvoice.bind(null, id)}>
          <Button type="submit" variant="destructive" className='text-gray-900'>Delete Invoice</Button>
        </form>
      </div>
      
      {/* Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-600">{invoice.client.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-600">{invoice.client.email}</p>
            </div>
            {invoice.client.phone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-600">{invoice.client.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Issue Date</p>
              <p className="font-medium text-gray-600">{formatDate(invoice.issueDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Due Date</p>
              <p className="font-medium text-gray-600">{formatDate(invoice.dueDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <form action={updateInvoice.bind(null, id)} className="flex gap-2">
                <select
                  name="status"
                  defaultValue={invoice.status}
                  className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-600"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="SENT">Sent</option>
                  <option value="PAID">Paid</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <Button type="submit" size="sm" className='text-gray-900'>Update</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-gray-900">Line Items</CardTitle>
              <CardDescription className="text-sm text-gray-600">Invoice items and charges</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {invoice.items.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No items yet</p>
          ) : (
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2 text-gray-900">Description</th>
                  <th className="pb-2 text-gray-900">Quantity</th>
                  <th className="pb-2 text-gray-900">Unit Price</th>
                  <th className="pb-2 text-gray-900">Amount</th>
                  <th className="pb-2 text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 text-gray-600">{item.description}</td>
                    <td className="py-3 text-gray-600">{item.quantity}</td>
                    <td className="py-3 text-gray-600">{formatCurrency(Number(item.unitPrice))}</td>
                    <td className="py-3 font-semibold text-gray-600">{formatCurrency(Number(item.amount))}</td>
                    <td className="py-3 text-gray-600">
                      <form action={deleteInvoiceItem.bind(null, item.id, id)}>
                        <Button type="submit" variant="ghost" size="sm">
                          <Trash2 size={16} />
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {/* Add Item Form */}
          <form action={addInvoiceItem.bind(null, id)} className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="font-semibold text-gray-900">Add Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                name="description"
                placeholder="Description"
                required
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-600"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                required
                min="1"
                defaultValue="1"
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-600"
              />
              <input
                type="number"
                name="unitPrice"
                placeholder="Price"
                required
                step="0.01"
                min="0"
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-600"
              />
              <Button type="submit" className="text-gray-900">
                <Plus size={16} />
                Add
              </Button>
            </div>
          </form>
          
          {/* Totals */}
          <div className="mt-6 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span className='text-gray-900'>Subtotal:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(Number(invoice.subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span className='text-gray-900'>Tax (10%):</span>
              <span className="font-semibold text-gray-900">{formatCurrency(Number(invoice.tax))}</span>
            </div>
            <div className="flex justify-between text-lg border-t pt-2">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-gray-900">{formatCurrency(Number(invoice.total))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notes */}
      {invoice.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{invoice.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
