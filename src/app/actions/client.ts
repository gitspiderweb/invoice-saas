'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireCompany } from '@/lib/auth'

export async function getClients() {
  const { companyId } = await requireCompany()
  
  return prisma.client.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getClient(id: string) {
  const { companyId } = await requireCompany()
  
  const client = await prisma.client.findFirst({
    where: {
      id,
      companyId, // Tenant isolation
    },
    include: {
      invoices: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  
  if (!client) {
    throw new Error('Client not found')
  }
  
  return client
}

export async function createClient(formData: FormData) {
  const { companyId } = await requireCompany()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  
  const client = await prisma.client.create({
    data: {
      companyId,
      name,
      email,
      phone,
      address,
    },
  })
  
  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}

export async function updateClient(id: string, formData: FormData) {
  const { companyId } = await requireCompany()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  
  await prisma.client.update({
    where: {
      id,
      companyId, // Tenant isolation
    },
    data: {
      name,
      email,
      phone,
      address,
    },
  })
  
  revalidatePath('/dashboard/clients')
  revalidatePath(`/dashboard/clients/${id}`)
}

export async function deleteClient(id: string) {
  const { companyId } = await requireCompany()
  
  await prisma.client.delete({
    where: {
      id,
      companyId, // Tenant isolation
    },
  })
  
  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}
