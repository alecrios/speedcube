import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('formatScramble', (scramble) => scramble.join(' '));

Vue.filter('formatTime', (time) => {
	let SS = Math.floor((time / 10) % 100);
	let ss = Math.floor((time / 1000) % 60);
	let mm = Math.floor((time / 1000 / 60) % 60);
	let HH = Math.floor((time / 1000 / 60 / 60) % 60);

	SS = String(SS).padStart(2, '0');
	ss = `${mm ? String(ss).padStart(2, '0') : String(ss)}.`;
	mm = mm ? `${HH ? String(mm).padStart(2, '0') : String(mm)}:` : '';
	HH = HH ? `${String(HH)}:` : '';

	return `${HH}${mm}${ss}${SS}`;
});

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
