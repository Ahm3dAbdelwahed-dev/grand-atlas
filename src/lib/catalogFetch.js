// Grand Atlas public catalog adapter.
// Existing JSON Server calls keep working in local development.
// On Vercel (or when VITE_USE_SUPABASE=true), read-only GET requests use Supabase.
// Never put secret/service_role keys in a Vite client.
import { createClient } from '@supabase/supabase-js'

const publicCollections = new Set([
  'stats', 'featuredProperties', 'futureLandmarks', 'units',
  'zones', 'zoneProjects', 'developers', 'developerProjects',
])

const localApi = 'http://localhost:3001'
const configuredApi = import.meta.env.VITE_API_URL
const useSupabase = import.meta.env.PROD || import.meta.env.VITE_USE_SUPABASE === 'true'

let client
function getClient() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase configuration. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in Vercel Environment Variables, then redeploy.'
    )
  }

  if (!client) client = createClient(url, key)
  return client
}

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function isLocalCatalogUrl(url) {
  if (url.origin === localApi) return true
  if (configuredApi) {
    try {
      const configured = new URL(configuredApi)
      return url.origin === configured.origin && url.pathname.startsWith(configured.pathname.replace(/\/$/, '') + '/')
    } catch {
      // Invalid optional VITE_API_URL: use the original request instead.
    }
  }
  return false
}

function catalogPath(url) {
  let pathname = url.pathname
  if (configuredApi) {
    try {
      const base = new URL(configuredApi)
      if (url.origin === base.origin && base.pathname !== '/') {
        const prefix = base.pathname.replace(/\/$/, '')
        if (pathname.startsWith(prefix + '/')) pathname = pathname.slice(prefix.length)
      }
    } catch {
      // No prefix to strip.
    }
  }
  const parts = pathname.split('/').filter(Boolean).map(decodeURIComponent)
  return parts
}

/** Response-compatible replacement for fetch() used by Grand Atlas pages. */
export async function catalogFetch(input, options = {}) {
  const rawUrl = typeof input === 'string' ? input : input.url
  const url = new URL(rawUrl, window.location.href)

  if (!useSupabase || !isLocalCatalogUrl(url)) {
    return globalThis.fetch(input, options)
  }

  const method = (options.method || (typeof input !== 'string' ? input.method : 'GET') || 'GET').toUpperCase()
  if (method !== 'GET') {
    throw new Error('Online submissions are disabled in this demo. No data was saved. A protected server-side endpoint is required for Contact and Register.')
  }

  const [collection, recordId, ...extra] = catalogPath(url)
  if (extra.length || !publicCollections.has(collection)) {
    throw new Error('This API resource is not part of the public read-only catalog.')
  }

  const signal = options.signal || (typeof input !== 'string' ? input.signal : undefined)
  if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError')

  let query = getClient().from(collection).select('*')

  if (recordId !== undefined) {
    query = query.eq('id', recordId).maybeSingle()
  } else {
    // The demo catalog currently contains fewer than 1,000 records per table.
    query = query.order('id', { ascending: true }).limit(1000)
    for (const [column, value] of url.searchParams) {
      if (column.startsWith('_')) continue // JSON Server metadata parameters
      query = query.eq(column, value)
    }
  }

  if (signal) query = query.abortSignal(signal)

  const { data, error } = await query
  if (error) {
    console.error('Grand Atlas Supabase read failed:', error.message)
    throw new Error(`Supabase could not read ${collection}: ${error.message}`)
  }

  if (recordId !== undefined && data == null) {
    return jsonResponse({ error: 'Not found' }, 404)
  }

  return jsonResponse(data)
}
