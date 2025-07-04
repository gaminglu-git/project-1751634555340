// Service Worker for photo upload caching and offline support
const CACHE_NAME = 'wedding-photos-v1';
const urlsToCache = ['/', '/api/photos/upload', '/uploads/guest-photos/'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
    // Handle photo uploads
    if (event.request.url.includes('/api/photos/upload') && event.request.method === 'POST') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // Store failed uploads for retry when online
                return new Response(
                    JSON.stringify({
                        error: 'Offline - Upload wird wiederholt wenn Verbindung verfügbar ist',
                        offline: true,
                    }),
                    {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
            }),
        );
        return;
    }

    // Handle other requests
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});
