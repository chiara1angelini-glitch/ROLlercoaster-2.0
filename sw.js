const C="rollercoaster-v3";
const F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
// prima la rete (cosi' gli aggiornamenti arrivano subito), se offline la copia salvata
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); if(r.ok) caches.open(C).then(c=>c.put(e.request,cp)); return r; })
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html")))); });
