/* eslint-disable no-console */

import {register} from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready() {
			console.log(
				'App is being served from cache by a service worker.\n'
				+ 'For more details, visit https://goo.gl/AFskqB',
			);
		},
		registered(registration) {
			console.log('Service worker has been registered.');

			// Check for a new service worker every hour
			setInterval(() => { registration.update(); }, 3600000);
		},
		cached() {
			console.log('Content has been cached for offline use.');
		},
		updatefound() {
			console.log('New content is downloading.');
		},
		updated(registration) {
			console.log('New content is available; please refresh.');

			// Dispatch a custom event to indicate that the service worker has updated
			document.dispatchEvent(new CustomEvent('swUpdated', {detail: registration}));
		},
		offline() {
			console.log('No internet connection found. App is running in offline mode.');
		},
		error(error) {
			console.error('Error during service worker registration:', error);
		},
	});
}
