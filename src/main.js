import Vue from 'vue';
import PortalVue from 'portal-vue';
import store from '@/store';
import router from '@/router';
import translate from '@/mixins/translate';
import App from '@/App.vue';

import '@/registerServiceWorker';

import kebabCase from 'lodash.kebabcase';

Vue.config.productionTip = false;

Vue.use(PortalVue);

Vue.filter('toKebabCase', (string) => kebabCase(string));

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

Vue.mixin(translate);

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
