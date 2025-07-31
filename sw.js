self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('alchemist-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/manifest.json',
        '/icon-192.png',
        '/icon-284.png',
        '/icon-384.png',
        '/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
