import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAuth } from '@/lib/auth'

export default async function SettingsPage() {
  const user = await requireAuth()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-700 mt-1">Manage your account and company settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Company Information</CardTitle>
          <CardDescription className="text-gray-600">Your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Company Name</p>
            <p className="font-medium text-gray-600">{user.company.name}</p>
          </div>
          {user.company.email && (
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-600">{user.company.email}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">User Profile</CardTitle>
          <CardDescription className="text-gray-600">Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-600">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-600">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
