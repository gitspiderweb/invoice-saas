import Link from 'next/link'
import Image from 'next/image'
import { getHelpArticles } from '@/lib/contentful'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, ArrowLeft, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Help Center | InvoiceFlow',
  description: 'Browse help articles and documentation for InvoiceFlow',
}

export default async function HelpPage() {
  const articles = await getHelpArticles()

  // Group articles by category
  const byCategory: Record<string, typeof articles> = {}
  for (const article of articles) {
    if (!byCategory[article.category]) {
      byCategory[article.category] = []
    }
    byCategory[article.category].push(article)
  }

  const categories = Object.keys(byCategory).sort()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/invoice.png" alt="InvoiceFlow logo" width={32} height={32} className="object-contain" />
            <span className="text-2xl font-bold"><span className="text-teal-800">Invoice</span><span className="text-emerald-500">Flow</span></span>
          </Link>
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

      {/* Hero */}
      <section className="bg-gradient-to-t from-teal-100 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <BookOpen className="text-teal-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-black mb-3">Help Center</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to know about using InvoiceFlow
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-700 mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-black mb-2">No Articles Yet</h2>
            <p className="text-slate-500 mb-8">Help articles will appear here once published in Contentful.</p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-slate-200">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byCategory[category].map((article) => (
                    <Link key={article.slug} href={`/help/${article.slug}`}>
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border border-slate-200 bg-slate-50">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
                              {article.category}
                            </span>
                            {article.featured && (
                              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-black text-lg leading-snug">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-500 text-sm leading-relaxed mb-4">
                            {article.excerpt}
                          </CardDescription>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={12} />
                            <span>
                              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          © 2026 InvoiceFlow. All rights reserved.{' '}
          <Link href="/" className="text-teal-700 hover:underline">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}
