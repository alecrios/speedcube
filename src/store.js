import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({key: 'store'}),
	],
	state: {
		sessions: {},
		currentSession: null,
		solves: {},
		currentSolve: {
			scramble: [],
			time: null,
			p2: false,
			dnf: false,
		},
	},
	getters: {
		sessions(state) {
			return Object.keys(state.sessions)
				.map((key) => Object.assign({id: key}, state.sessions[key]));
		},
		solves(state) {
			return Object.keys(state.solves)
				.map((key) => Object.assign({id: key}, state.solves[key]));
		},
	},
	mutations: {
		addSession(state, payload) {
			Vue.set(state.sessions, payload.id, {name: payload.name});
		},
		renameSession(state, payload) {
			Vue.set(state.sessions[payload.id], 'name', payload.name);
		},
		removeSession(state, id) {
			Vue.delete(state.sessions, id);
		},
		// removeSolvesOfSession(state, id) {

		// },
		updateCurrentSession(state, id) {
			state.currentSession = id;
		},
		addSolve(state, payload) {
			const solve = Object.assign({session: payload.session}, state.currentSolve);
			Vue.set(state.solves, payload.id, solve);
		},
		removeSolve(state, id) {
			Vue.delete(state.solves, id);
		},
		toggleSolveDnf(state, id) {
			Vue.set(state.solves[id], 'dnf', !state.solves[id].dnf);
		},
		toggleSolveP2(state, id) {
			Vue.set(state.solves[id], 'time', state.solves[id].p2
				? state.solves[id].time - 2000
				: state.solves[id].time + 2000);
			Vue.set(state.solves[id], 'p2', !state.solves[id].p2);
		},
		updateCurrentSolveScramble(state, scramble) {
			state.currentSolve.scramble = scramble;
		},
		updateCurrentSolveTime(state, time) {
			state.currentSolve.time = time;
		},
	},
});
