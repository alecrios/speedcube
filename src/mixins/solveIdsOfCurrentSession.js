export default {
	computed: {
		$_solveIdsOfCurrentSession() {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session
					=== this.$store.state.currentSession);
		},
	},
};
