import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({key: 'store'}),
	],
	state: {
		currentSession: null,
		sessionIds: [],
		sessions: {},
		solveIds: [],
		solves: {},
	},
	mutations: {
		addSession(state, payload) {
			state.sessionIds.unshift(payload.id);
			Vue.set(state.sessions, payload.id, {
				name: payload.name,
				cubeSize: payload.cubeSize,
			});
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
			state.solveIds.unshift(payload.solveId);
			Vue.set(state.solves, payload.solveId, payload.solve);
		},
		removeSolve(state, id) {
			state.solveIds.splice(state.solveIds.indexOf(id), 1);
			Vue.delete(state.solves, id);
		},
		setSolveDnf(state, payload) {
			if (state.solves[payload.id].dnf === payload.value) return;

			Vue.set(state.solves[payload.id], 'dnf', payload.value);
		},
		setSolveP2(state, payload) {
			if (state.solves[payload.id].p2 === payload.value) return;

			Vue.set(state.solves[payload.id], 'p2', payload.value);

			Vue.set(state.solves[payload.id], 'time', state.solves[payload.id].p2
				? state.solves[payload.id].time + 2000
				: state.solves[payload.id].time - 2000);
		},
	},
});
