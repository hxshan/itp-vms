import React from 'react'
import { sanitizeHtml } from '../../utils/sanitizer'

export default function SafeHTML({ html }) {
  const clean = sanitizeHtml(html)
  return (
    <div dangerouslySetInnerHTML={{ __html: clean }} />
  )
}


