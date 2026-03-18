import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create a demo company
  const company = await prisma.company.create({
    data: {
      name: 'Demo Company Inc.',
      email: 'demo@company.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
  })
  
  console.log('Created company:', company.name)
  
  // Note: Users are created via Clerk authentication + onboarding
  // Clients and invoices would be created by authenticated users
  
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
