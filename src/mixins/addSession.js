import moment from 'moment';

export default {
	methods: {
		$_addSession(payload = {}) {
			const id = payload.id || String(Date.now());
			const name = payload.name || moment().format('YYYY-MM-DD');
			const puzzleType = payload.puzzleType || '3x3x3';

			this.$store.commit('addSession', {id, name, puzzleType});
			this.$store.commit('updateCurrentSession', id);
		},
	},
};
