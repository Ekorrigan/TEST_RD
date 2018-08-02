var Test=0;
var Version='1.18';
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Service Worker Version #' + Version);
  event.waitUntil(
    caches.open(Version).then(function(cache) {
    Test=0;
      return cache.addAll([
        '/TEST_RD/',
        '/TEST_RD/index.html',
        '/TEST_RD/style.css',
        '/TEST_RD/app.js',
        '/TEST_RD/gallery/wallpaper.jpg',
        '/TEST_RD/gallery/wallpaper2.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		if (Test==0){ Test++; console.log('version #'+Version);}
		// caches.match() always resolves
		// but in case of success response will have value
		if (response !== undefined) {
			if(response.status!=200){
				response= caches.match('/TEST_RD/gallery/wallpaper.jpg');
				caches.open(Version).then(function (cache) {
					cache.put(event.request, response.clone());
				});
			}
			fetch(event.request).then(function (resp) {
				if(resp.status==200){
					caches.open(Version).then(function (cache) {
						cache.put(event.request, resp.clone());
					});
				}
			});
			return response;
		} else {
			return fetch(event.request).then(function (response) {
				if(response.status==200){
					// response may be used only once
					// we need to save clone to put one copy in cache
					// and serve second one
					let responseClone = response.clone();

					caches.open(Version).then(function (cache) {
						cache.put(event.request, responseClone);
					});
					return response;
				}
				else{
					return caches.match('/TEST_RD/gallery/wallpaper.jpg');
				}
			}).catch(function () {
				return caches.match('/TEST_RD/gallery/wallpaper.jpg');
			});
		}
	}));
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key!== Version) {
					return caches.delete(key);
				}
			}));
		})
	);
});
