import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, Users, DollarSign, Shield, BarChart, Clock, Bell, Settings, Star, Zap, Globe, Lock } from 'lucide-react'
import { getLandingPageHero, getFeatures } from '@/lib/contentful'

// All available icons selectable in Contentful
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={32} />,
  Users: <Users size={32} />,
  DollarSign: <DollarSign size={32} />,
  Shield: <Shield size={32} />,
  BarChart: <BarChart size={32} />,
  Clock: <Clock size={32} />,
  Bell: <Bell size={32} />,
  Settings: <Settings size={32} />,
  Star: <Star size={32} />,
  Zap: <Zap size={32} />,
  Globe: <Globe size={32} />,
  Lock: <Lock size={32} />,
}

const staticFeatures = [
  { title: 'Invoice Management', description: 'Create, track, and manage invoices with ease', icon: 'FileText' },
  { title: 'Client Tracking', description: 'Manage all your clients in one place', icon: 'Users' },
  { title: 'Payment Tracking', description: 'Monitor payments and outstanding invoices', icon: 'DollarSign' },
  { title: 'Secure & Isolated', description: 'Multi-tenant architecture with data isolation', icon: 'Shield' },
]

export default async function Home() {
  const [hero, features] = await Promise.all([getLandingPageHero(), getFeatures()])

  const heroTitle = hero?.title ?? 'Professional Invoice Management'
  const heroSubtitle = hero?.subtitle ?? 'Multi-tenant SaaS platform for managing invoices, clients, and payments. Secure, isolated, and professional-grade.'
  const heroCtaText = hero?.ctaText ?? 'Start Free Trial'
  const heroCtaUrl = hero?.ctaUrl ?? '/sign-up'

  const displayFeatures = features.length > 0 ? features : staticFeatures

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons/invoice.png" alt="InvoiceFlow logo" width={32} height={32} className="object-contain" />
            <span className="text-2xl font-bold"><span className="text-teal-800">Invoice</span><span className="text-emerald-500">Flow</span></span>
          </div>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-t from-teal-100 to-white overflow-hidden" style={{ maxHeight: 'calc(100vh - 68px)' }}>
        <div className="container mx-auto px-4 pt-24 pb-0 text-center flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            {heroTitle}
            <br />
            <span className="text-teal-600">For Your Business</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
          <Link href={heroCtaUrl}>
            <Button size="lg" className="text-lg px-8 py-6 bg-teal-600 hover:bg-teal-700 text-white">
              {heroCtaText}
            </Button>
          </Link>

          {/* App Screenshot — peeking at bottom edge */}
          <div className="mt-12 mx-auto w-full max-w-5xl">
            <div className="rounded-t-2xl overflow-hidden shadow-2xl border-4 border-b-0 border-black">
              <Image
                src="/images/app-screenshot.png"
                alt="InvoiceFlow app screenshot"
                width={1280}
                height={800}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Why InvoiceFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayFeatures.map((feature) => {
              return (
                <div key={feature.title} className="bg-slate-50 rounded-xl p-6 text-center shadow-sm border border-slate-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                    <span className="text-teal-600">
                      {iconMap[feature.icon] ?? <FileText size={32} />}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-slate-500">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="bg-teal-100 py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-3">Need Help Getting Started?</h2>
          <p className="text-black mb-6">Browse our help articles and documentation</p>
          <Link href="/help">
            <Button className="bg-teal-800 hover:bg-teal-900 text-white border-0">
              View Help Articles
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500">© 2026 InvoiceFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/help" className="text-slate-500 hover:text-teal-700 text-sm">Help Center</Link>
              <Link href="/sign-in" className="text-slate-500 hover:text-teal-700 text-sm">Sign In</Link>
              <Link href="/sign-up" className="text-slate-500 hover:text-teal-700 text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
