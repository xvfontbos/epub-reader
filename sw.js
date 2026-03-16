const CACHE_NAME = 'lector-epub-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];

// Instal·lació: Guardem el HTML i la llibreria JSZip a la memòria cau
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activació: Netegem memòria antiga si cal
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Estratègia: Primer mirem si està a la memòria, si no, anem a la xarxa
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});