// PTS-Maths — Service Worker
// Stratégie : cache-first pour les fichiers statiques, network-first pour le contenu dynamique.

const VERSION = 'pts-maths-v0.1.0';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

// Fichiers à mettre en cache dès l'installation (l'app marche hors ligne dès le premier lancement).
const PRECACHE_URLS = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch((err) => {
        // On ne bloque pas l'install si une ressource manque (ex: icône pas encore générée)
        console.warn('[SW] Precache partiel:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE — nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH — cache-first pour le statique, fallback réseau pour le reste
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // On ne gère que les GET
  if (request.method !== 'GET') return;

  // On ignore les requêtes vers d'autres origines (YouTube, Gemini, CDN…)
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // On met en cache à la volée
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // Fallback offline pour la navigation
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
