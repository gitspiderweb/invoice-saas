import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getHelpArticleBySlug, getHelpArticles } from '@/lib/contentful'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export async function generateStaticParams() {
  const articles = await getHelpArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getHelpArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found | InvoiceFlow' }
  return {
    title: `${article.title} | InvoiceFlow Help`,
    description: article.excerpt,
  }
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getHelpArticleBySlug(slug)

  if (!article) {
    notFound()
  }

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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/help" className="hover:text-blue-600">Help Center</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/help" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Help Center
        </Link>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="bg-blue-600 px-8 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-100 bg-blue-500 px-3 py-1 rounded-full">
                <Tag size={10} />
                {article.category}
              </span>
              {article.featured && (
                <span className="text-xs font-medium text-amber-200 bg-amber-600/30 px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
            <p className="text-blue-100 text-lg leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center gap-2 mt-6 text-sm text-blue-200">
              <Calendar size={14} />
              <span>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="px-8 py-10">
            <RichText content={article.content} />
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/help">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              All Help Articles
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-gray-900">Get Started Free</Button>
          </Link>
        </div>
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
