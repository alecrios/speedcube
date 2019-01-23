import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('formatScramble', (scramble) => scramble.join(' '));

Vue.filter('formatTime', (time) => {
	const milliseconds = Math.floor((time / 10) % 100);
	const seconds = Math.floor((time / 1000) % 60);
	const minutes = Math.floor((time / 1000 / 60) % 60);
	const hours = Math.floor((time / 1000 / 60 / 60) % 60);

	const SS = String(milliseconds).padStart(2, '0');
	const ss = `${String(seconds).padStart(2, '0')}.`;
	const mm = minutes ? `${String(minutes).padStart(2, '0')}:` : '';
	const HH = hours ? `${String(hours).padStart(2, '0')}:` : '';

	return `${HH}${mm}${ss}${SS}`;
});

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
