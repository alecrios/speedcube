import moment from 'moment';

export default {
	methods: {
		$_addSession(payload = {}) {
			const id = payload.id || String(Date.now());
			const name = payload.name || moment().format('YYYY-MM-DD');
			const cubeSize = Number(payload.cubeSize) || 3;

			this.$store.commit('addSession', {id, name, cubeSize});
			this.$store.commit('updateCurrentSession', id);
		},
	},
};
