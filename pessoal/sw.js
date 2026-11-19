/* Fine (pessoal): guarda o app no aparelho para abrir sem internet.
   - Página principal: busca a versão nova quando há internet; sem internet, usa a guardada.
   - Firebase, fontes e JSZip: guardados na primeira vez que carregam (as versões são fixas).
   - Dados (Firestore e login) não passam por aqui: o próprio Firebase guarda no aparelho e envia quando a internet voltar. */
const CACHE = "fine-pessoal-v1";
const APP = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "favicon-64.png"];

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
    if (url.origin !== location.origin) return;
    e.respondWith(fetch(req).then(guardar).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
    return;
  }
  if (url.origin !== location.origin) {
    const fixo = (url.host === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/")) || /^fonts\.(googleapis|gstatic)\.com$/.test(url.host) || url.host === "cdnjs.cloudflare.com";
    if (!fixo) return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(guardar)));
});
