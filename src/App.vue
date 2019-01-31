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
	created() {
		if (this.$store.state.sessionIds.length) return;

		this.$_addSession();
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

	--color-white: hsl(220, 10%, 90%);
	--color-white-lighter: hsl(220, 10%, 93%);
	--color-white-darker: hsl(220, 10%, 84%);

	--color-background: hsl(220, 10%, 15%);
	--color-background-lighter: hsl(220, 10%, 18%);
	--color-background-darker: hsl(220, 10%, 9%);

	--color-primary: hsl(220, 75%, 50%);
	--color-primary-lighter: hsl(220, 75%, 53%);
	--color-primary-darker: hsl(220, 75%, 44%);

	--color-secondary: hsl(220, 15%, 25%);
	--color-secondary-lighter: hsl(220, 15%, 28%);
	--color-secondary-darker: hsl(220, 15%, 19%);

	--color-cube-white: hsl(0, 0%, 90%);
	--color-cube-green: hsl(127, 80%, 70%);
	--color-cube-red: hsl(0, 80%, 70%);
	--color-cube-blue: hsl(223, 80%, 70%);
	--color-cube-orange: hsl(23, 80%, 70%);
	--color-cube-yellow: hsl(47, 80%, 70%);

	--box-shadow: 0 .125rem .25rem 0 rgba(0, 0, 0, .5);
}

html {
	background-color: var(--color-gray-5);
	font-family: 'Roboto';
	color: var(--color-cube-white);
}

body {
	background-color: var(--color-gray-1);
}

::-moz-focus-inner {
	border: 0;
}

.js-focus-visible :focus:not([data-focus-visible-added]) {
	outline: none;
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
}

#footer {
	flex: none;
}
</style>
