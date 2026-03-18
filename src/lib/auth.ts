import { auth, currentUser } from '@clerk/nextjs/server'
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
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export async function requireCompany() {
  const user = await requireAuth()
  
  if (!user.companyId) {
    throw new Error('No company associated with user')
  }
  
  return {
    user,
    companyId: user.companyId,
  }
}
