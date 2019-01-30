export default {
	methods: {
		addSession(payload = {}) {
			const id = payload.id || String(Date.now());
			const name = payload.name || String(Date.now());
			const cubeSize = payload.cubeSize || 3;

			this.$store.commit('addSession', {id, name, cubeSize});
			this.$store.commit('updateCurrentSession', id);
		},
	},
};
