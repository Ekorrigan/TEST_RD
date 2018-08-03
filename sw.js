var Test=0;
var Version='1.42b';
self.addEventListener('install', function(event) {
  console.log('Service Worker Version #' + Version);
});

self.addEventListener('fetch', function(event) {
  const curUrl = new URL(
    event.request.url
  );
  if (curUrl.pathname === "/TEST_RD/version/") {
    event.respondWith(
      new Response(
        new Blob(
          [Version],
          {type : "text/html"}
        ),
        {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "text/html",
          }
        }
      )
    );
  }else{
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
	  console.log("cache ("+Version+"): "+curUrl.pathname);
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
	  				console.log("NetWork : "+curUrl.pathname);
					return response;
				}
			});
		}
	}));
  }
});

self.addEventListener('activate', function(event) {
	
		console.log("suppression du cache");
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
// A chaque fois qu'on reçoit un
// message d'une page web
self.addEventListener("message", event => {
  // On vérifie si c'est un signal
  // d'activation
  if (event.data === "skipWaiting") {
    // Et si c'est le cas, on force
    // l'activation
    self.skipWaiting();
	  console.log("skipWaiting");
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key!== Version) {
					return caches.delete(key);
				}
			}));
		});	  
		caches.open(Version).then(function(cache) {
		    Test=0;
		      return cache.addAll([
			'/TEST_RD/',
			'/TEST_RD/index.html',
			'/TEST_RD/style.css',
			'/TEST_RD/app.js',
			'/TEST_RD/gallery/wallpaper.jpg'
		      ]);
		    });
  }
});
