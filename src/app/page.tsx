import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Users, DollarSign, Shield } from 'lucide-react'
import { getLandingPageHero, getFeatures } from '@/lib/contentful'

// Icon map for Contentful icon field values
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={32} />,
  Users: <Users size={32} />,
  DollarSign: <DollarSign size={32} />,
  Shield: <Shield size={32} />,
}

const staticFeatures = [
  { title: 'Invoice Management', description: 'Create, track, and manage invoices with ease', icon: 'FileText', iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
  { title: 'Client Tracking', description: 'Manage all your clients in one place', icon: 'Users', iconColor: 'text-green-600', bgColor: 'bg-green-100' },
  { title: 'Payment Tracking', description: 'Monitor payments and outstanding invoices', icon: 'DollarSign', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
  { title: 'Secure & Isolated', description: 'Multi-tenant architecture with data isolation', icon: 'Shield', iconColor: 'text-red-600', bgColor: 'bg-red-100' },
]

const bgColorMap: Record<string, string> = {
  'text-blue-600': 'bg-blue-100',
  'text-green-600': 'bg-green-100',
  'text-purple-600': 'bg-purple-100',
  'text-red-600': 'bg-red-100',
  'text-yellow-600': 'bg-yellow-100',
  'text-pink-600': 'bg-pink-100',
}

export default async function Home() {
  const [hero, features] = await Promise.all([getLandingPageHero(), getFeatures()])

  const heroTitle = hero?.title ?? 'Professional Invoice Management'
  const heroSubtitle = hero?.subtitle ?? 'Multi-tenant SaaS platform for managing invoices, clients, and payments. Secure, isolated, and professional-grade.'
  const heroCtaText = hero?.ctaText ?? 'Start Free Trial'
  const heroCtaUrl = hero?.ctaUrl ?? '/sign-up'

  const displayFeatures = features.length > 0 ? features : staticFeatures

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">InvoiceFlow</h1>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-gray-900">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {heroTitle}
          <br />
          <span className="text-blue-600">For Your Business</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
        <Link href={heroCtaUrl}>
          <Button size="lg" className="text-lg px-8 py-6 text-gray-900">
            {heroCtaText}
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why InvoiceFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayFeatures.map((feature) => {
            const iconColor = feature.iconColor ?? 'text-blue-600'
            const bgColor = 'bgColor' in feature ? (feature as typeof staticFeatures[0]).bgColor : (bgColorMap[iconColor] ?? 'bg-blue-100')
            return (
              <div key={feature.title} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${bgColor} rounded-full mb-4`}>
                  <span className={iconColor}>
                    {iconMap[feature.icon] ?? <FileText size={32} />}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Help Banner */}
      <section className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need Help Getting Started?</h2>
          <p className="text-blue-100 mb-6">Browse our help articles and documentation</p>
          <Link href="/help">
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
              View Help Articles
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700">© 2026 InvoiceFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/help" className="text-gray-600 hover:text-blue-600 text-sm">Help Center</Link>
            <Link href="/sign-in" className="text-gray-600 hover:text-blue-600 text-sm">Sign In</Link>
            <Link href="/sign-up" className="text-gray-600 hover:text-blue-600 text-sm">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
