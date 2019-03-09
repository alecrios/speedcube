import localization from '@/localization';

export default {
	methods: {
		$t(message) {
			return localization.messages[this.$store.state.settings.locale][message]
				|| localization.messages[localization.default][message];
		},
	},
};
