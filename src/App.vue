<template>
	<div id="app">
		<Scramble :scramble="currentSolve.scramble"/>
		<Time :time="currentSolve.time"/>
		<Stats/>
	</div>
</template>

<script>
import eventBus from './eventBus';
import Scramble from './components/Scramble.vue';
import Time from './components/Time.vue';
import Stats from './components/Stats.vue';
import 'focus-visible';

export default {
	name: 'app',
	components: {
		Scramble,
		Time,
		Stats,
	},
	data() {
		return {
			currentSolve: {
				scramble: [],
				time: null,
			},
		};
	},
	created() {
		eventBus.listen('new-scramble', (scramble) => {
			this.currentSolve.scramble = scramble;
		});

		eventBus.listen('timer-ended', (time) => {
			this.currentSolve.time = time;

			this.$store.commit('addSolve', Object.assign({
				timestamp: Date.now(),
			}, this.currentSolve));

			eventBus.emit('reset');
		});
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

html {
	box-sizing: border-box;
	font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 100%;
	line-height: 1;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

*,
*:before,
*:after {
	box-sizing: inherit;
	margin: 0;
	padding: 0;
	border: 0;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	font-weight: inherit;
	font-style: inherit;
	vertical-align: baseline;
	background: transparent;
}

img {
	max-width: 100%;
	height: auto;
	border-style: none;
	vertical-align: middle;
}

a {
	color: currentColor;
	text-decoration: none;
}

ol,
ul {
	list-style: none;
}

[type="button"],
[type="color"],
[type="date"],
[type="datetime-local"],
[type="email"],
[type="file"],
[type="month"],
[type="number"],
[type="password"],
[type="range"],
[type="reset"],
[type="search"],
[type="submit"],
[type="tel"],
[type="text"],
[type="time"],
[type="url"],
[type="week"],
select,
textarea,
button {
	border-radius: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
}

::placeholder {
	color: rgba(255, 255, 255, .375);
}

table,
tr,
th,
td {
	border-spacing: 0;
}

::-moz-focus-inner {
	border: 0;
}

.js-focus-visible :focus:not([data-focus-visible-added]) {
	outline: none;
}

html {
	background-color: rgba(31, 31, 31, 1);
	color: var(--color-white);
}

:root {
	--color-white: hsl(0, 0%, 90%);
	--color-green: hsl(127, 80%, 70%);
	--color-red: hsl(0, 80%, 70%);
	--color-blue: hsl(223, 80%, 70%);
	--color-orange: hsl(23, 80%, 70%);
	--color-yellow: hsl(47, 80%, 70%);
}
</style>
