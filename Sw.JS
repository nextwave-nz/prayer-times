// Hamilton Masjid PWA — Service Worker
// Version: 1.0.0
const CACHE_NAME = 'hamilton-masjid-v1';
const ASSETS = [
  '/prayer-times/',
  '/prayer-times/index.html',
  '/prayer-times/manifest.json',
  'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(response => {
        // Cache new requests dynamically
        if (e.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('/index.html'))
  );
});

// Push notifications handler
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || '🕌 Hamilton Masjid';
  const options = {
    body: data.body || 'Prayer time notification',
    icon: '/prayer-times/icons/icon-192.png',
    badge: '/prayer-times/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'open' || !e.action) {
    e.waitUntil(clients.openWindow(e.notification.data.url || '/'));
  }
});
