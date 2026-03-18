import { createClient } from '@/app/actions/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Client</h1>
          <p className="text-gray-700 mt-1">Add a new client</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>Enter the client information</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createClient} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-900"
                placeholder="Company Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-900"
                placeholder="client@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-900"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-900"
                placeholder="123 Main St, City, State 12345"
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">Create Client</Button>
              <Link href="/dashboard/clients">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
