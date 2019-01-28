import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({key: 'store'}),
	],
	state: {
		sessionIds: [],
		sessions: {},
		currentSession: null,
		solveIds: [],
		solves: {},
		currentSolve: {
			scramble: [],
			time: null,
			p2: false,
			dnf: false,
		},
	},
	mutations: {
		addSession(state, payload) {
			state.sessionIds.unshift(payload.id);
			Vue.set(state.sessions, payload.id, {name: payload.name});
		},
		renameSession(state, payload) {
			Vue.set(state.sessions[payload.id], 'name', payload.name);
		},
		removeSession(state, id) {
			state.sessionIds.splice(state.sessionIds.indexOf(id), 1);
			Vue.delete(state.sessions, id);
		},
		removeSolvesOfSession(state, id) {
			state.solveIds = state.solveIds
				.filter((solveId) => {
					if (state.solves[solveId].session !== id) return true;

					Vue.delete(state.solves, solveId);
					return false;
				});
		},
		updateCurrentSession(state, id) {
			state.currentSession = id;
		},
		addSolve(state, payload) {
			state.solveIds.unshift(payload.id);
			Vue.set(state.solves, payload.id, Object.assign(
				{session: payload.session}, state.currentSolve,
			));
		},
		removeSolve(state, id) {
			state.solveIds.splice(state.solveIds.indexOf(id), 1);
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
