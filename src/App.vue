<template>
	<div id="app" :data-version="version">
		<div class="head">
			<TheHeader v-if="!isFullscreen"/>
			<TheNav v-if="!isFullscreen"/>
		</div>

		<div class="body">
			<TheMain/>
			<TheFooter v-if="!isFullscreen"/>
		</div>

		<TheUpdatePrompt v-if="updateAvailable" @reload="reload"/>

		<PortalTarget name="modals"/>
	</div>
</template>

<script>
import 'core-reset/core-reset.css';
import 'focus-visible';

import TheHeader from '@/components/TheHeader.vue';
import TheNav from '@/components/TheNav.vue';
import TheMain from '@/components/TheMain.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheUpdatePrompt from '@/components/TheUpdatePrompt.vue';

import addSession from '@/mixins/addSession';

export default {
	name: 'app',
	mixins: [addSession],
	components: {
		TheHeader,
		TheNav,
		TheMain,
		TheFooter,
		TheUpdatePrompt,
	},
	data() {
		return {
			version: process.env.VUE_APP_VERSION,
			refreshing: false,
			registration: null,
			updateAvailable: false,
		};
	},
	computed: {
		isFullscreen() {
			return this.$store.state.settings.isFullscreen;
		},
	},
	methods: {
		handleServiceWorker() {
			// Only continue if service workers are supported
			if (!('serviceWorker' in navigator)) return;

			// Listen for service worker update and prompt the user to reload
			document.addEventListener('swUpdated', (event) => {
				this.registration = event.detail;
				this.updateAvailable = true;
			}, {once: true});

			// Refresh all open app tabs when a new service worker is installed
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (this.refreshing) return;

				this.refreshing = true;
				window.location.reload();
			});
		},
		reload() {
			// Reset the update available flag
			this.updateAvailable = false;

			// Protect against missing registration.waiting
			if (!this.registration || !this.registration.waiting) return;

			// Tell the service worker to update immediately
			this.registration.waiting.postMessage('skipWaiting');
		},
		initializeSession() {
			// Only continue if no session has been created yet
			if (this.$store.state.currentSession) return;

			this.$_addSession();
		},
		resetFullscreen() {
			this.$store.commit('setFullscreen', false);
		},
	},
	created() {
		this.handleServiceWorker();
		this.initializeSession();
		this.resetFullscreen();
	},
};
</script>

<style>
/* Fonts
----------------------------- */

@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 300;
	src:
		local('Roboto Light'),
		local('Roboto-Light'),
		url('./assets/fonts/roboto-v18-latin-300.woff2') format('woff2'),
		url('./assets/fonts/roboto-v18-latin-300.woff') format('woff');
}

@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	src:
		local('Roboto'),
		local('Roboto-Regular'),
		url('./assets/fonts/roboto-v18-latin-regular.woff2') format('woff2'),
		url('./assets/fonts/roboto-v18-latin-regular.woff') format('woff');
}

@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 500;
	src:
		local('Roboto Medium'),
		local('Roboto-Medium'),
		url('./assets/fonts/roboto-v18-latin-500.woff2') format('woff2'),
		url('./assets/fonts/roboto-v18-latin-500.woff') format('woff');
}

/* Root
----------------------------- */

:root {
	--color-white: hsla(220, 10%, 85%, 1);
	--color-white-lighter: hsla(220, 10%, 88%, 1);
	--color-white-darker: hsla(220, 10%, 80%, 1);

	--color-smoke: hsla(220, 10%, 60%, 1);
	--color-smoke-lighter: hsla(220, 10%, 63%, 1);
	--color-smoke-darker: hsla(220, 10%, 55%, 1);

	--color-charcoal: hsla(220, 10%, 10%, 1);
	--color-charcoal-lighter: hsla(220, 10%, 13%, 1);
	--color-charcoal-darker: hsla(220, 10%, 5%, 1);

	--color-slate: hsla(220, 10%, 15%, 1);
	--color-slate-lighter: hsla(220, 10%, 18%, 1);
	--color-slate-darker: hsla(220, 10%, 10%, 1);

	--color-primary: hsla(220, 75%, 50%, 1);
	--color-primary-lighter: hsla(220, 75%, 53%, 1);
	--color-primary-darker: hsla(220, 75%, 45%, 1);

	--color-secondary: hsla(220, 15%, 25%, 1);
	--color-secondary-lighter: hsla(220, 15%, 28%, 1);
	--color-secondary-darker: hsla(220, 15%, 20%, 1);

	--color-danger: hsla(0, 75%, 35%, 1);
	--color-danger-lighter: hsla(0, 75%, 38%, 1);
	--color-danger-darker: hsla(0, 75%, 30%, 1);

	--color-cube-white: hsla(0, 0%, 90%, 1);
	--color-cube-green: hsla(127, 80%, 70%, 1);
	--color-cube-red: hsla(0, 80%, 70%, 1);
	--color-cube-blue: hsla(223, 80%, 70%, 1);
	--color-cube-orange: hsla(23, 80%, 70%, 1);
	--color-cube-yellow: hsla(47, 80%, 70%, 1);

	--color-backdrop: hsla(0, 0%, 0%, .5);
	--box-shadow-focus: 0 0 0 .125rem hsla(220, 100%, 75%, .5);
	--box-shadow-small: 0 .125rem .25rem 0 hsla(0, 0%, 0%, .5);
	--box-shadow-medium: 0 .5rem 1.125rem 0 hsla(0, 0%, 0%, .5);
	--box-shadow-large: 0 .75rem 1.5rem 0 hsla(0, 0%, 0%, .5);
	--text-shadow: 0 .125rem .125rem hsla(0, 0%, 0%, .125);
}

/* Global
----------------------------- */

html {
	font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	background-color: var(--color-charcoal);
	text-shadow: var(--text-shadow);
	height: 100%;
}

body {
	background-color: var(--color-charcoal);
	height: 100%;
}

/* Layout
----------------------------- */

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
}

#app > .head {
	flex: none;
}

#app > .body {
	flex: 1;
	overflow: auto;
	display: flex;
	flex-direction: column;
}

/* Focus
----------------------------- */

::-moz-focus-inner {
	border: 0;
}

.js-focus-visible :focus {
	outline: none;
	box-shadow: var(--box-shadow-focus);
}

.js-focus-visible :focus:not([data-focus-visible-added]) {
	box-shadow: none;
}
</style>
