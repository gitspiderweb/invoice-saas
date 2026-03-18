import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from './db'

export async function getCurrentUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { company: true },
  })
  
  return user
}

export async function requireAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  const user = await getCurrentUser()
  
  // User is authenticated with Clerk but hasn't completed onboarding
  if (!user) {
    redirect('/onboarding')
  }
  
  return user
}

export async function requireCompany() {
  const user = await requireAuth()
  
  if (!user.companyId) {
    redirect('/onboarding')
  }
  
  return {
    user,
    companyId: user.companyId,
  }
}
