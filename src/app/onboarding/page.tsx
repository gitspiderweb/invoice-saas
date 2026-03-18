import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { createUserAndCompany } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function OnboardingPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  const user = await currentUser()
  
  // Check if user already has a company
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  
  if (existingUser) {
    redirect('/dashboard')
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-gray-900">Welcome to InvoiceFlow</CardTitle>
          <CardDescription className="text-gray-600">
            Let's set up your company to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUserAndCompany} className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-gray-900"
                placeholder="Acme Inc."
              />
            </div>
            
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                defaultValue={user?.firstName || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                defaultValue={user?.lastName || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            
            <input
              type="hidden"
              name="email"
              value={user?.emailAddresses[0]?.emailAddress || ''}
            />
            
            <Button type="submit" className="w-full">
              Create Company
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
