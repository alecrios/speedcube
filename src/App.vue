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

	--box-shadow-focus: 0 0 0 .125rem hsla(220, 100%, 75%, .5);
	--box-shadow: 0 .125rem .25rem 0 hsla(0, 0%, 0%, .5);
	--text-shadow: 0 .125rem .125rem hsla(0, 0%, 0%, .125);
}

html {
	font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;;
	background-color: var(--color-slate);
	text-shadow: var(--text-shadow);
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
	background-color: var(--color-slate);
	border-top: .125rem solid var(--color-slate-lighter);
	border-bottom: .125rem solid var(--color-slate-darker);
}

#footer {
	flex: none;
}
</style>
