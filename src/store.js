import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import puzzleTypes from '@/puzzleTypes';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({key: 'store'}),
	],
	state: {
		version: process.env.VUE_APP_VERSION,
		scrambles: puzzleTypes.reduce((obj, type) => Object.assign(obj, {[type.value]: []}), {}),
		settings: {
			locale: 'en',
			isFullscreen: false,
			enableInspection: false,
			enableInspectionAudio: false,
			hideClockWhileSolving: false,
		},
		currentSession: null,
		sessionIds: [],
		sessions: {},
		solveIds: [],
		solves: {},
	},
	mutations: {
		pushScramble(state, payload) {
			state.scrambles[payload.puzzleType].push(payload.scramble);
		},
		popScramble(state, puzzleType) {
			state.scrambles[puzzleType].pop();
		},
		setLocale(state, locale) {
			state.settings.locale = locale;
		},
		setFullscreen(state, isFullscreen) {
			state.settings.isFullscreen = isFullscreen;
		},
		setEnableInspection(state, enableInspection) {
			state.settings.enableInspection = enableInspection;
		},
		setEnableInspectionAudio(state, enableInspectionAudio) {
			state.settings.enableInspectionAudio = enableInspectionAudio;
		},
		setHideClockWhileSolving(state, hideClockWhileSolving) {
			state.settings.hideClockWhileSolving = hideClockWhileSolving;
		},
		addSession(state, payload) {
			state.sessionIds.unshift(payload.id);
			Vue.set(state.sessions, payload.id, {
				name: payload.name,
				puzzleType: payload.puzzleType,
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
			const {solveId, solve} = payload;

			// If this solve has the +2 penalty, adjust the time
			if (solve.status === '+2') {
				solve.time += 2000;
			}

			state.solveIds.unshift(solveId);
			Vue.set(state.solves, solveId, solve);
		},
		removeSolve(state, id) {
			state.solveIds.splice(state.solveIds.indexOf(id), 1);
			Vue.delete(state.solves, id);
		},
		setSolveStatus(state, payload) {
			const solve = state.solves[payload.id];
			const oldStatus = solve.status;
			const newStatus = payload.status;

			if (oldStatus === newStatus) return;

			Vue.set(solve, 'status', newStatus);

			// If this was a change to/from +2, adjust the solve time accordingly
			if (oldStatus === '+2') {
				Vue.set(solve, 'time', solve.time - 2000);
			} else if (newStatus === '+2') {
				Vue.set(solve, 'time', solve.time + 2000);
			}
		},
	},
});
