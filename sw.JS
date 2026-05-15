// ══════════════════════════════════════════════════════════════════
// Waikato Prayer Times — Service Worker v4
// Strategy: Network-first for HTML, cache-first for static assets
// ══════════════════════════════════════════════════════════════════

const CACHE_VERSION = 'v4';
const CACHE_NAME = `waikato-prayer-${CACHE_VERSION}`;
const APP_URL = '/prayer-times/';

const STATIC_ASSETS = [
  '/prayer-times/',
  '/prayer-times/index.html',
  '/prayer-times/manifest.json',
  '/prayer-times/icon-192.png',
  '/prayer-times/icon-512.png'
];

// ── INSTALL: pre-cache static assets, activate immediately ──
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
});

// ── ACTIVATE: clear old caches, take control, notify clients ──
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter(n => n.startsWith('waikato-prayer-') && n !== CACHE_NAME)
          .map(n => caches.delete(n))
      );
      await self.clients.claim();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION });
      });
    })()
  );
});

// ── FETCH: network-first for HTML, cache-first for assets ──
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.origin !== self.location.origin) return;

  // HTML / navigation: network-first
  const isHTML = request.mode === 'navigate' ||
                 request.destination === 'document' ||
                 (request.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match(APP_URL)))
    );
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// ── MESSAGE: allow client to force skip-waiting ──
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
