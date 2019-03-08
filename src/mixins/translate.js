import translations from '@/translations';

const defaultLocale = 'en';

export default {
	methods: {
		$t(message) {
			return translations[this.$store.state.settings.locale][message]
				|| translations[defaultLocale][message];
		},
	},
};
