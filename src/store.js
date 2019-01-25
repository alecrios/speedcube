import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		solves: [],
	},
	getters: {
		solves(state) {
			return state.solves;
		},
	},
	mutations: {
		addSolve(state, solve) {
			state.solves.push(solve);
		},
		removeSolve(state, index) {
			state.solves.splice(index, 1);
		},
		toggleDnf(state, index) {
			state.solves[index].dnf = !state.solves[index].dnf;
		},
		toggleP2(state, index) {
			state.solves[index].time = state.solves[index].p2
				? state.solves[index].time - 2000
				: state.solves[index].time + 2000;

			state.solves[index].p2 = !state.solves[index].p2;
		},
	},
});
