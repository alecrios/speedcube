import dotenv from 'dotenv';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import Vue from 'vue';
import PortalVue from 'portal-vue';
import store from '@/store';
import router from '@/router';
import localize from '@/mixins/localize';
import App from '@/App.vue';
import '@/registerServiceWorker';

dotenv.config();

Vue.config.productionTip = false;

// Register portal plugin globally
Vue.use(PortalVue);

// Register localize mixin globally
Vue.mixin(localize);

// Register formatTime filter globally
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

// Get all base components
const requireComponent = require.context('./components/base');

// Register each base component globally
requireComponent.keys().forEach((fileName) => {
	// Get the component config
	const componentConfig = requireComponent(fileName);

	// Get the PascalCase version of the component name
	const componentName = upperFirst(camelCase(fileName.replace('./', '').replace('.vue', '')));

	// Globally register the component
	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
