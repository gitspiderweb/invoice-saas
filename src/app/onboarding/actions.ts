'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function createUserAndCompany(formData: FormData) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }
  
  const companyName = formData.get('companyName') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  
  // Create company and user in a transaction
  await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: companyName,
        email: email,
      },
    })
    
    await tx.user.create({
      data: {
        clerkId: userId,
        email,
        firstName,
        lastName,
        companyId: company.id,
      },
    })
  })
  
  redirect('/dashboard')
}
