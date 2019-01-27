import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({key: 'store'}),
	],
	state: {
		solves: [],
		currentSolve: {
			scramble: [],
			time: null,
			p2: false,
			dnf: false,
		},
	},
	getters: {
		solves(state) {
			return state.solves;
		},
		currentSolveScramble(state) {
			return state.currentSolve.scramble;
		},
	},
	mutations: {
		addSolve(state) {
			state.solves.unshift(Object.assign({timestamp: Date.now()}, state.currentSolve));
		},
		removeSolve(state, index) {
			state.solves.splice(index, 1);
		},
		removeAllSolves(state) {
			state.solves = [];
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
		updateCurrentSolveScramble(state, scramble) {
			state.currentSolve.scramble = scramble;
		},
		updateCurrentSolveTime(state, time) {
			state.currentSolve.time = time;
		},
	},
});
