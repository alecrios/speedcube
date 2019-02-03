import moment from 'moment';

export default {
	methods: {
		$_renameSession(payload = {}) {
			this.$store.commit('renameSession', {
				id: payload.id,
				name: payload.name || moment().format('YYYY-MM-DD'),
			});
		},
	},
};
