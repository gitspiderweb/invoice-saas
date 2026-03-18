import { getClients } from '@/app/actions/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function ClientsPage() {
  const clients = await getClients()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-700 mt-1">Manage your clients</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button>
            <Plus size={20} />
            New Client
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>A list of all your clients</CardDescription>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No clients yet</p>
              <Link href="/dashboard/clients/new">
                <Button>Add Your First Client</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client) => (
                <Link
                  key={client.id}
                  href={`/dashboard/clients/${client.id}`}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">{client.email}</p>
                  {client.phone && (
                    <p className="text-sm text-gray-600">{client.phone}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
