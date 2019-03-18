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
