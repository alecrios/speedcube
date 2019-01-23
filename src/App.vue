<template>
	<div id="app">
		<router-link to="/">Home</router-link>
		<router-link to="/solves">Solves</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
import 'core-reset/core-reset.css';
import 'focus-visible';

export default {
	name: 'app',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

:root {
	--color-white: hsl(0, 0%, 90%);
	--color-green: hsl(127, 80%, 70%);
	--color-red: hsl(0, 80%, 70%);
	--color-blue: hsl(223, 80%, 70%);
	--color-orange: hsl(23, 80%, 70%);
	--color-yellow: hsl(47, 80%, 70%);
}

html {
	background-color: rgba(31, 31, 31, 1);
	font-family: 'Roboto';
	color: var(--color-white);
}

::-moz-focus-inner {
	border: 0;
}

.js-focus-visible :focus:not([data-focus-visible-added]) {
	outline: none;
}
</style>
