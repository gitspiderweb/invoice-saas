'use client'

import React from 'react'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import type { Document } from '@contentful/rich-text-types'

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold text-gray-900">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_, children) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc list-outside text-gray-700 mb-4 space-y-1 pl-6">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal list-outside text-gray-700 mb-4 space-y-1 pl-6">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className="leading-relaxed">
        {React.Children.map(children as React.ReactNode[], (child) => {
          if (React.isValidElement(child) && child.type === 'p') {
            return <span className="text-gray-700">{(child as React.ReactElement<{ children: React.ReactNode }>).props.children}</span>
          }
          return child
        })}
      </li>
    ),
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-gray-200 my-8" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target={node.data.uri.startsWith('http') ? '_blank' : undefined}
        rel={node.data.uri.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
}

interface RichTextProps {
  content: Document
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div className="prose max-w-none">
      {documentToReactComponents(content, options)}
    </div>
  )
}
