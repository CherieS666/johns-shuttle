// John's Shuttle — Service Worker
// Caches the core shell so the booking form loads even with poor signal.

const CACHE_NAME = 'johns-shuttle-v1';

// Files to cache on install — the core app shell
const SHELL_FILES = [
  '/index.html',
  '/login.html',
  '/manifest.json'
  // Note: app.js is intentionally excluded so Supabase calls always go live.
  // Google Maps API is external and not cached here.
];

// ---- INSTALL: cache the shell ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_FILES).catch(() => {
        // If any file fails (e.g. running locally without a server), still activate.
        console.warn('[SW] Some shell files could not be cached.');
      });
    })
  );
  self.skipWaiting();
});

// ---- ACTIVATE: clean up old caches ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ---- FETCH: network-first for API calls, cache-first for shell ----
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always go network-first for Supabase, Google APIs, and external resources
  const isExternal =
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('jsdelivr.net') ||
    url.hostname.includes('fonts.googleapis.com');

  if (isExternal) {
    // Network only — no caching for live data or external CDNs
    return;
  }

  // For same-origin requests: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses for our own files
        if (
          response.ok &&
          event.request.method === 'GET' &&
          (event.request.url.endsWith('.html') ||
           event.request.url.endsWith('.js') ||
           event.request.url.endsWith('.css') ||
           event.request.url.endsWith('.png') ||
           event.request.url.endsWith('.json'))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
