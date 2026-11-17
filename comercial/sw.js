/* fin$nce: guarda o app no aparelho para abrir sem internet.
   A página principal busca a versão nova quando há internet; sem internet, usa a guardada. */
const CACHE = "finance-v1";
const APP = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const guardar = r => { if (r && (r.ok || r.type === "opaque")) { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); } return r; };
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(guardar).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  const externo = url.origin !== location.origin;
  if (externo && !/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host)) return;
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(guardar)));
});
