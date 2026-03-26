import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">InvoiceFlow</Link>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="text-gray-900">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <BookOpen className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Help Center</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Everything you need to know about using InvoiceFlow
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {articles.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Articles Yet</h2>
            <p className="text-gray-600 mb-8">Help articles will appear here once published in Contentful.</p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byCategory[category].map((article) => (
                    <Link key={article.slug} href={`/help/${article.slug}`}>
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              {article.category}
                            </span>
                            {article.featured && (
                              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-gray-900 text-lg leading-snug">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                            {article.excerpt}
                          </CardDescription>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
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
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          © 2026 InvoiceFlow. All rights reserved.{' '}
          <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}
