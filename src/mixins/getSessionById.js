export default {
	methods: {
		$_getSessionById(id) {
			return this.$store.state.sessions[id];
		},
	},
};
