<template>
	<div id="app">
		<TheHeader id="header"/>

		<TheNav id="nav"/>

		<RouterView id="content"/>

		<TheFooter id="footer"/>

		<PortalTarget name="modals"/>
	</div>
</template>

<script>
import 'core-reset/core-reset.css';
import 'focus-visible';

import TheHeader from '@/components/TheHeader.vue';
import TheNav from '@/components/TheNav.vue';
import TheFooter from '@/components/TheFooter.vue';

import addSession from '@/mixins/addSession';

export default {
	name: 'app',
	mixins: [addSession],
	components: {
		TheHeader,
		TheNav,
		TheFooter,
	},
	methods: {
		initializeSession() {
			if (this.$store.state.currentSession) return;

			this.$_addSession();
		},
	},
	created() {
		this.initializeSession();
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

:root {
	--color-gray-1: rgba(31, 31, 31, 1);
	--color-gray-2: rgba(38, 39, 39, 1);
	--color-gray-3: rgba(45, 47, 47, 1);
	--color-gray-4: rgba(52, 55, 55, 1);
	--color-gray-5: rgba(59, 63, 63, 1);
	--color-gray-6: rgba(66, 71, 71, 1);
	--color-gray-7: rgba(73, 79, 79, 1);
	--color-gray-8: rgba(80, 87, 87, 1);
	--color-gray-9: rgba(86, 95, 95, 1);

	--color-white: hsla(220, 10%, 85%, 1);
	--color-white-lighter: hsla(220, 10%, 88%, 1);
	--color-white-darker: hsla(220, 10%, 79%, 1);

	--color-bg2: hsla(220, 10%, 10%, 1);
	--color-bg2-lighter: hsla(220, 10%, 13%, 1);
	--color-bg2-darker: hsla(220, 10%, 4%, 1);

	--color-background: hsla(220, 10%, 15%, 1);
	--color-background-lighter: hsla(220, 10%, 18%, 1);
	--color-background-darker: hsla(220, 10%, 9%, 1);

	--color-primary: hsla(220, 75%, 50%, 1);
	--color-primary-lighter: hsla(220, 75%, 53%, 1);
	--color-primary-darker: hsla(220, 75%, 44%, 1);

	--color-secondary: hsla(220, 15%, 25%, 1);
	--color-secondary-lighter: hsla(220, 15%, 28%, 1);
	--color-secondary-darker: hsla(220, 15%, 19%, 1);

	--color-danger: hsla(0, 75%, 35%, 1);
	--color-danger-lighter: hsla(0, 75%, 38%, 1);
	--color-danger-darker: hsla(0, 75%, 29%, 1);

	--color-cube-white: hsla(0, 0%, 90%, 1);
	--color-cube-green: hsla(127, 80%, 70%, 1);
	--color-cube-red: hsla(0, 80%, 70%, 1);
	--color-cube-blue: hsla(223, 80%, 70%, 1);
	--color-cube-orange: hsla(23, 80%, 70%, 1);
	--color-cube-yellow: hsla(47, 80%, 70%, 1);

	--box-shadow-focus: 0 0 0 .125rem hsla(220, 100%, 75%, .5);
	--box-shadow: 0 .125rem .25rem 0 hsla(0, 0%, 0%, .5);
	--text-shadow: 0 .125rem .25rem hsla(0, 0%, 0%, .25);
}

html {
	background-color: var(--color-background);
	font-family: 'Roboto';
	color: red; /* TODO REMOVE */
	text-shadow: var(--text-shadow);
}

body {
	background-color: var(--color-background);
}

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

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

#header {
	flex: none;
}

#nav {
	flex: none;
}

#content {
	flex: 1 0 auto;
	padding: 1.5rem 0;
	background-color: var(--color-background);
	border-top: .125rem solid var(--color-background-lighter);
	border-bottom: .125rem solid var(--color-background-darker);
}

#footer {
	flex: none;
}
</style>
