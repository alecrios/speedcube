import Vue from 'vue';
import Router from 'vue-router';
import Timer from '@/views/Timer.vue';
import Sessions from '@/views/Sessions.vue';
import Solves from '@/views/Solves.vue';
import Stats from '@/views/Stats.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'Timer',
			component: Timer,
		},
		{
			path: '/sessions',
			name: 'Sessions',
			component: Sessions,
		},
		{
			path: '/solves',
			name: 'Solves',
			component: Solves,
		},
		{
			path: '/stats',
			name: 'Stats',
			component: Stats,
		},
		{
			path: '*',
			name: 'NotFound',
			component: NotFound,
		},
	],
});
