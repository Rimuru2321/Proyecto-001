const CACHE_NAME = 'cosmos-v1';
const urlsToCache = [
  '/proyecto-001/',
  '/proyecto-001/index.html',
  '/proyecto-001/css/styles.css',
  '/proyecto-001/js/script.js',
  '/proyecto-001/lang/es.json',
  '/proyecto-001/lang/en.json',
  '/proyecto-001/img/favicon.ico',
  '/proyecto-001/comment-policy.html',
  '/proyecto-001/legal.html',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&family=Space+Mono&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Instalación: guardar en caché los archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar: limpiar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones y responder con caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devolverlo
        if (response) {
          return response;
        }
        // Si no, hacer fetch normal
        return fetch(event.request);
      })
  );
});