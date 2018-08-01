self.addEventListener('install', function(event) {
  Version='v0';
  console.log('Service Worker Version #' + Version);
  event.waitUntil(
    caches.open(Version).then(function(cache) {
      return cache.addAll([
        '/TEST_RD/',
        '/TEST_RD/index.html',
        '/TEST_RD/style.css',
        '/TEST_RD/app.js',
        '/TEST_RD/gallery/snowTroopers.jpg',
        '/TEST_RD/gallery/wallpaper.jpg',
        '/TEST_RD/gallery/wallpaper2.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
        if(response.status==200){
      console.log('réponse du cache');
      console.log(response)
      return response;
        }
        else{
        console.log('cache not found - réponse par défaut du cache ');
return caches.match('/TEST_RD/gallery/snowTroopers.jpg');
        }
    } else {
      return fetch(event.request).then(function (response) {
        if(response.status==200){
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          console.log('réponse du net');
          let responseClone = response.clone();

          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }
        else{
        console.log('Net not found - réponse par défaut du cache');
return caches.match('/TEST_RD/gallery/snowTroopers.jpg');
        }
      }).catch(function () {
        console.log('réponse par défaut du cache');
        return caches.match('/TEST_RD/gallery/snowTroopers.jpg');
      });
    }
  }));
});
