self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('alchemist-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/manifest.json',
        '/sw.js',
        '/icon-192.png' // sau 512 etc., în funcție de ce ai
      ]);
    })
  );
});
