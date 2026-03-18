'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireCompany } from '@/lib/auth'

export async function getInvoices() {
  const { companyId } = await requireCompany()
  
  return prisma.invoice.findMany({
    where: { companyId },
    include: {
      client: true,
      items: true,
      payments: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getInvoice(id: string) {
  const { companyId } = await requireCompany()
  
  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      companyId, // Tenant isolation
    },
    include: {
      client: true,
      items: true,
      payments: true,
    },
  })
  
  if (!invoice) {
    throw new Error('Invoice not found')
  }
  
  return invoice
}

export async function createInvoice(formData: FormData) {
  const { companyId } = await requireCompany()
  
  const clientId = formData.get('clientId') as string
  const dueDate = formData.get('dueDate') as string
  const notes = formData.get('notes') as string
  
  // Generate invoice number
  const lastInvoice = await prisma.invoice.findFirst({
    where: { companyId },
    orderBy: { invoiceNumber: 'desc' },
  })
  
  const invoiceNumber = lastInvoice
    ? `INV-${(parseInt(lastInvoice.invoiceNumber.split('-')[1]) + 1).toString().padStart(4, '0')}`
    : 'INV-0001'
  
  const invoice = await prisma.invoice.create({
    data: {
      companyId,
      clientId,
      invoiceNumber,
      dueDate: new Date(dueDate),
      notes,
      status: 'DRAFT',
    },
  })
  
  revalidatePath('/dashboard/invoices')
  redirect(`/dashboard/invoices/${invoice.id}`)
}

export async function updateInvoice(id: string, formData: FormData) {
  const { companyId } = await requireCompany()
  
  const status = formData.get('status') as string
  const notes = formData.get('notes') as string
  
  await prisma.invoice.update({
    where: {
      id,
      companyId, // Tenant isolation
    },
    data: {
      status: status as any,
      notes,
    },
  })
  
  revalidatePath('/dashboard/invoices')
  revalidatePath(`/dashboard/invoices/${id}`)
}

export async function deleteInvoice(id: string) {
  const { companyId } = await requireCompany()
  
  await prisma.invoice.delete({
    where: {
      id,
      companyId, // Tenant isolation
    },
  })
  
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function addInvoiceItem(invoiceId: string, formData: FormData) {
  const { companyId } = await requireCompany()
  
  // Verify invoice belongs to company
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, companyId },
  })
  
  if (!invoice) {
    throw new Error('Invoice not found')
  }
  
  const description = formData.get('description') as string
  const quantity = parseInt(formData.get('quantity') as string)
  const unitPrice = parseFloat(formData.get('unitPrice') as string)
  const amount = quantity * unitPrice
  
  await prisma.invoiceItem.create({
    data: {
      invoiceId,
      description,
      quantity,
      unitPrice,
      amount,
    },
  })
  
  // Recalculate invoice totals
  await recalculateInvoiceTotals(invoiceId)
  
  revalidatePath(`/dashboard/invoices/${invoiceId}`)
}

export async function deleteInvoiceItem(itemId: string, invoiceId: string) {
  const { companyId } = await requireCompany()
  
  // Verify invoice belongs to company
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, companyId },
  })
  
  if (!invoice) {
    throw new Error('Invoice not found')
  }
  
  await prisma.invoiceItem.delete({
    where: { id: itemId },
  })
  
  await recalculateInvoiceTotals(invoiceId)
  
  revalidatePath(`/dashboard/invoices/${invoiceId}`)
}

async function recalculateInvoiceTotals(invoiceId: string) {
  const items = await prisma.invoiceItem.findMany({
    where: { invoiceId },
  })
  
  const subtotal = items.reduce((sum: number, item) => sum + Number(item.amount), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax
  
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      subtotal,
      tax,
      total,
    },
  })
}
