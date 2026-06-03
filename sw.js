// Background engine required for native Android PWA installation
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Keeps the layout performing seamlessly
});
