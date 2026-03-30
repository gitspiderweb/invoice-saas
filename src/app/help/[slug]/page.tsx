import Link from 'next/link'
import Image from 'next/image'
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

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-700">Home</Link>
            <span>/</span>
            <Link href="/help" className="hover:text-teal-700">Help Center</Link>
            <span>/</span>
            <span className="text-black font-medium truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/help" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-700 mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Help Center
        </Link>

        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Article Header */}
          <div className="bg-gradient-to-t from-teal-100 to-white px-8 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                <Tag size={10} />
                {article.category}
              </span>
              {article.featured && (
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">{article.title}</h1>
            <p className="text-slate-600 text-lg leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center gap-2 mt-6 text-sm text-slate-400">
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
            <Button variant="outline" className="flex items-center gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
              <ArrowLeft size={16} />
              All Help Articles
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Get Started Free</Button>
          </Link>
        </div>
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
