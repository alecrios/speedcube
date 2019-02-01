export default {
	methods: {
		$_addSolve(solveId, solve) {
			this.$store.commit('addSolve', {solveId, solve});
		},
	},
};
