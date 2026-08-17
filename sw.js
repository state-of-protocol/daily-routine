const CACHE_NAME = 'jadual-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './js/app.js',
    './js/db.js',
    './js/ui.js',
    './manifest.json'
];

// Pasang cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Ambil dari cache jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
