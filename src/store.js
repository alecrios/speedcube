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
	},
});
