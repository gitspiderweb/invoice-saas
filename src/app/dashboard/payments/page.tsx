import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-700 mt-1">Track your payments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Payment History</CardTitle>
          <CardDescription className="text-gray-600">All payments received</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">Payment tracking coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
