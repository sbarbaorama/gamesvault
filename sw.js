// Service worker: the app opens fast and works offline (the data comes from GitHub, cached by the page).
const CACHE = "libreria-app-2026-10-17-4";
const SHELL = ["./", "index.html", "manifest.webmanifest", "vendor/xlsx.full.min.js", "vendor/jszip.min.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache:"reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("libreria-app-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin === location.origin){
    if(req.mode === "navigate" || url.pathname.endsWith("/index.html")){
      // the page: newest version when online, saved copy when offline
      e.respondWith(fetch(req, { cache:"no-cache" }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return r; })
        .catch(() => caches.match("index.html", { ignoreSearch:true })));
      return;
    }
    e.respondWith(caches.match(req, { ignoreSearch:true }).then(hit => hit || fetch(req)));
    return;
  }
  if(url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if(r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
