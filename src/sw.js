/* eslint-disable */

// Listens for the user's confirmation to update the app
self.addEventListener('message', (event) => {
	if (!event.data) return;

	switch (event.data) {
	case 'skipWaiting':
		self.skipWaiting();
		break;
	default:
		break;
	}
});

workbox.clientsClaim();

// Precaching code provided by Workbox
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
