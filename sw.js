const CACHE = 'asa-ascension-xp-v1';
const FILES = [
  "./",
  "./index.html",
  "./install.js",
  "./manifest.webmanifest",
  "./assets/ascension-night.webp",
  "./assets/distant-wyvern.webp",
  "./assets/fonts/OFL.txt",
  "./assets/fonts/chakra-petch-400.ttf",
  "./assets/fonts/chakra-petch-500.ttf",
  "./assets/fonts/chakra-petch-600.ttf",
  "./assets/fonts/chakra-petch-700.ttf",
  "./assets/icons/ascension-180.png",
  "./assets/icons/ascension-192.png",
  "./assets/icons/ascension-512.png",
  "./assets/icons/ascension-icon.svg",
  "./assets/lake-mist-a.svg",
  "./assets/lake-mist-b.svg"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('asa-ascension-xp-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(event.request);
        if (response.ok) await cache.put(new URL('index.html', self.registration.scope).href, response.clone());
        return response;
      } catch {
        return (await cache.match(new URL('index.html', self.registration.scope).href)) || Response.error();
      }
    })());
  } else {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const saved = await cache.match(event.request);
      if (saved) return saved;
      return fetch(event.request);
    })());
  }
});
