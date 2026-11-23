import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/*
 * At build time, preload the hero photograph and the display font. Both are needed
 * for the first paint, and the browser would otherwise find them only after the
 * JavaScript has run. The hashed file names are looked up in the bundle.
 */
function preloadCriticalAssets(): Plugin {
  const wanted = [
    { pattern: /post-saree-line-coming-soon-[\w-]+\.webp$/, as: 'image', type: 'image/webp', fetchpriority: 'high' },
    { pattern: /bodoni-moda-latin-wght-normal-[\w-]+\.woff2$/, as: 'font', type: 'font/woff2', crossorigin: true },
  ]
  return {
    name: 'nakhrel-preload-critical-assets',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const files = Object.keys(ctx.bundle ?? {})
      const tags = wanted.flatMap((w) => {
        const file = files.find((f) => w.pattern.test(f))
        if (!file) return []
        const attrs = [
          'rel="preload"',
          `as="${w.as}"`,
          `type="${w.type}"`,
          `href="/${file}"`,
          w.crossorigin ? 'crossorigin' : '',
          w.fetchpriority ? `fetchpriority="${w.fetchpriority}"` : '',
        ].filter(Boolean)
        return [`<link ${attrs.join(' ')} />`]
      })
      return html.replace('</head>', `${tags.join('\n    ')}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadCriticalAssets()],
})
