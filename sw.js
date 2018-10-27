const cacheFiles = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/sw.js',
    '/js/restaurant_info.js',
    '/img/1-320_sm.jpg',
    '/img/1-560_md.jpg',
    '/img/1-800_lg.jpg',
    '/img/2-320_sm.jpg',
    '/img/2-560_md.jpg',
    '/img/2-800_lg.jpg',
    '/img/3-320_sm.jpg',
    '/img/3-560_md.jpg',
    '/img/3-800_lg.jpg',
    '/img/4-320_sm.jpg',
    '/img/4-560_md.jpg',
    '/img/4-800_lg.jpg',
    '/img/5-320_sm.jpg',
    '/img/5-560_md.jpg',
    '/img/5-800_lg.jpg',
    '/img/6-320_sm.jpg',
    '/img/6-560_md.jpg',
    '/img/6-800_lg.jpg',
    '/img/7-320_sm.jpg',
    '/img/7-560_md.jpg',
    '/img/7-800_lg.jpg',
    '/img/8-320_sm.jpg',
    '/img/8-560_md.jpg',
    '/img/8-800_lg.jpg',
    '/img/9-320_sm.jpg',
    '/img/9-560_md.jpg',
    '/img/9-800_lg.jpg',
    '/img/10-320_sm.jpg',
    '/img/10-560_md.jpg',
    '/img/10-800_lg.jpg',
];

cacheName = 'restaurants-app';

self.addEventListener('install', function(event) {
    
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request).then(function (response) {

            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    var responseToCache = response.clone();

                    caches.open(cacheName).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );

        }).catch(function (error) {
            console.log('Get restaurants from idb...');
            console.log(error);
        })
    );
});