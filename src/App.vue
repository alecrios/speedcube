<template>
	<div id="app">
		<TheHeader id="header"/>

		<TheNav id="nav"/>

		<RouterView id="content"/>

		<TheFooter id="footer"/>
	</div>
</template>

<script>
import 'core-reset/core-reset.css';
import 'focus-visible';
import TheHeader from '@/components/TheHeader.vue';
import TheNav from '@/components/TheNav.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
	name: 'app',
	components: {
		TheHeader,
		TheNav,
		TheFooter,
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
	--color-white: hsl(0, 0%, 90%);
	--color-green: hsl(127, 80%, 70%);
	--color-red: hsl(0, 80%, 70%);
	--color-blue: hsl(223, 80%, 70%);
	--color-orange: hsl(23, 80%, 70%);
	--color-yellow: hsl(47, 80%, 70%);
}

html {
	background-color: var(--color-gray-5);
	font-family: 'Roboto';
	color: var(--color-white);
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
