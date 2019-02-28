import translations from '@/translations';

export default {
	methods: {
		$t(message) {
			return translations[this.$store.state.settings.locale][message];
		},
	},
};
