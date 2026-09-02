/**
 * Emits a real HTML file per enabled map, plus sitemap.xml and 404.html.
 *
 * GitHub Pages serves 404.html with HTTP status 404, so the usual SPA fallback
 * would make every deep link uncrawlable. A static file per map answers 200 and
 * carries its own title, description and canonical; the SPA still boots inside it.
 */
import type { Plugin } from 'vite'
import mapsIndex from '../public/data/maps/index.json' with { type: 'json' }
import type { MapsIndex } from '../src/core/model/types.ts'

const SITE_ORIGIN = 'https://maps.outlasttrialsstats.com'
const SITE_NAME = 'Outlast Trials Maps'
const INDEX_HTML = 'index.html'
const JSON_LD_BLOCK = /\n?[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>/
const CANONICAL_LINK = /\n?[ \t]*<link rel="canonical"[^>]*>/

interface PageMeta {
  title: string
  description: string
  url: string
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Throws rather than silently shipping a wrong canonical when index.html changes. */
function setTagAttribute(html: string, selector: string, attribute: string, value: string): string {
  const pattern = new RegExp(
    `(<(?:meta|link)\\s[^>]*${escapeRegExp(selector)}[^>]*?\\s${attribute}=")[^"]*(")`,
  )
  if (!pattern.test(html)) {
    throw new Error(`vite-plugin-seo: index.html has no tag matching ${selector} with ${attribute}`)
  }
  return html.replace(
    pattern,
    (_match, before: string, after: string) => before + escapeHtml(value) + after,
  )
}

function withPageMeta(html: string, { title, description, url }: PageMeta): string {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  for (const selector of ['property="og:title"', 'name="twitter:title"']) {
    out = setTagAttribute(out, selector, 'content', title)
  }
  for (const selector of [
    'name="description"',
    'property="og:description"',
    'name="twitter:description"',
  ]) {
    out = setTagAttribute(out, selector, 'content', description)
  }
  out = setTagAttribute(out, 'property="og:url"', 'content', url)
  out = setTagAttribute(out, 'rel="canonical"', 'href', url)
  return out.replace(JSON_LD_BLOCK, '')
}

function withNoIndex(html: string): string {
  return setTagAttribute(html, 'name="robots"', 'content', 'noindex, follow')
    .replace(CANONICAL_LINK, '')
    .replace(JSON_LD_BLOCK, '')
}

function renderSitemap(paths: string[]): string {
  const entries = paths.map((path) => `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}

export function seoPlugin(): Plugin {
  let isRootDeployment = false

  return {
    name: 'outlasttrials-maps:seo',
    apply: 'build',
    // 'post' guarantees vite:build-html has put index.html into the bundle.
    enforce: 'post',

    configResolved(config) {
      isRootDeployment = config.base === '/'
    },

    generateBundle(_options, bundle) {
      const indexAsset = bundle[INDEX_HTML]
      // This plugin is the only producer of 404.html, so a bundle shape it no
      // longer recognises must fail the build instead of deploying without one.
      if (indexAsset?.type !== 'asset' || typeof indexAsset.source !== 'string') {
        throw new Error(`vite-plugin-seo: ${INDEX_HTML} is not a text asset in the bundle`)
      }

      const html = indexAsset.source
      // Previews are served from the production domain; without this they would
      // claim to be indexable and canonicalise themselves to the live homepage.
      if (!isRootDeployment) {
        indexAsset.source = withNoIndex(html)
        return
      }

      const { maps }: MapsIndex = mapsIndex
      const enabledMaps = maps.filter((map) => map.enabled)

      for (const map of enabledMaps) {
        this.emitFile({
          type: 'asset',
          fileName: `maps/${map.id}/${INDEX_HTML}`,
          source: withPageMeta(html, {
            title: `${map.name} Map — ${SITE_NAME}`,
            description: `Interactive ${map.name} map for The Outlast Trials — rooms, enemy spawns, keys and objectives.`,
            url: `${SITE_ORIGIN}/maps/${map.id}/`,
          }),
        })
      }

      this.emitFile({ type: 'asset', fileName: '404.html', source: withNoIndex(html) })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: renderSitemap(['/', ...enabledMaps.map((map) => `/maps/${map.id}/`)]),
      })
    },
  }
}
