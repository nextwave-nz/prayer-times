var CACHE_NAME = 'hamilton-masjid-v12';
var urlsToCache = ['./', './manifest.json', './icon-192x192.png', './icon-512x512.png'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(c) { return c.addAll(urlsToCache) }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(n) {
    return Promise.all(n.filter(function(k) { return k !== CACHE_NAME }).map(function(k) { return caches.delete(k) }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request) }));
});
