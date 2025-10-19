import DOMPurify from 'dompurify'

export function sanitizeHtml(dirtyHtml) {
  if (typeof dirtyHtml !== 'string') return ''
  return DOMPurify.sanitize(dirtyHtml, {
    USE_PROFILES: { html: true },
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|data:image\/(?:png|jpeg|webp);base64))/i
  })
}


