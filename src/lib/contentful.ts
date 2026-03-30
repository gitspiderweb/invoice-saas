import { createClient, EntrySkeletonType } from 'contentful'
import type { Document } from '@contentful/rich-text-types'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
})

// ——— Types ———

export interface HeroFields {
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  backgroundGradient?: string
}

export interface FeatureFields {
  title: string
  description: string
  icon: string
  order: number
}

export interface HelpArticleFields {
  title: string
  slug: string
  category: string
  excerpt: string
  content: Document
  publishedDate: string
  featured?: boolean
}

type HeroSkeleton = EntrySkeletonType & { fields: HeroFields; contentTypeId: 'landingPageHero' }
type FeatureSkeleton = EntrySkeletonType & { fields: FeatureFields; contentTypeId: 'feature' }
type HelpArticleSkeleton = EntrySkeletonType & { fields: HelpArticleFields; contentTypeId: 'helpArticle' }

// ——— Fetchers ———

export async function getLandingPageHero(): Promise<HeroFields | null> {
  try {
    const entries = await contentfulClient.getEntries<HeroSkeleton>({
      content_type: 'landingPageHero',
      limit: 1,
    })
    if (entries.items.length === 0) return null
    return entries.items[0].fields as unknown as HeroFields
  } catch {
    return null
  }
}

export async function getFeatures(): Promise<FeatureFields[]> {
  try {
    const entries = await contentfulClient.getEntries<FeatureSkeleton>({
      content_type: 'feature',
      order: ['fields.order'],
    })
    return entries.items.map((item) => item.fields as unknown as FeatureFields)
  } catch {
    return []
  }
}

export async function getHelpArticles(): Promise<HelpArticleFields[]> {
  try {
    const entries = await contentfulClient.getEntries<HelpArticleSkeleton>({
      content_type: 'helpArticle',
      order: ['-fields.publishedDate'],
    })
    return entries.items.map((item) => item.fields as unknown as HelpArticleFields)
  } catch {
    return []
  }
}

export async function getHelpArticleBySlug(slug: string): Promise<HelpArticleFields | null> {
  try {
    const entries = await contentfulClient.getEntries<HelpArticleSkeleton>({
      content_type: 'helpArticle',
      'fields.slug': slug,
      limit: 1,
    })
    if (entries.items.length === 0) return null
    return entries.items[0].fields as unknown as HelpArticleFields
  } catch {
    return null
  }
}

export async function getFeaturedHelpArticles(): Promise<HelpArticleFields[]> {
  try {
    const entries = await contentfulClient.getEntries<HelpArticleSkeleton>({
      content_type: 'helpArticle',
      'fields.featured': true,
      order: ['-fields.publishedDate'],
      limit: 6,
    })
    return entries.items.map((item) => item.fields as unknown as HelpArticleFields)
  } catch {
    return []
  }
}
