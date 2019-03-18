<template>
	<div class="timer">
		<TimerScramble
			:scramble-status="scrambleStatus"
			@scramble-status-update="(newStatus) => { scrambleStatus = newStatus }"
			:solve-id="solveId"
			:scramble="scramble"
			@new-scramble="(newScramble) => { scramble = newScramble }"
		/>

		<TimerClock
			:timer-status="timerStatus"
			@timer-status-update="(newStatus) => { timerStatus = newStatus }"
			:scramble-status="scrambleStatus"
			:previous-solve-id="previousSolveId"
			:solve-id="solveId"
			@new-time="addSolve"
		/>

		<TimerActions
			:timer-status="timerStatus"
			:solve-id="previousSolveId"
			@deleted="onDeleted"
		/>
	</div>
</template>

<script>
import TimerScramble from '@/components/TimerScramble.vue';
import TimerClock from '@/components/TimerClock.vue';
import TimerActions from '@/components/TimerActions.vue';

export default {
	name: 'Timer',
	components: {
		TimerScramble,
		TimerClock,
		TimerActions,
	},
	data() {
		return {
			scrambleStatus: 'ready',
			timerStatus: 'idle',
			previousSolveId: null,
			solveId: String(Date.now()),
			scramble: '',
		};
	},
	computed: {
		// The current puzzle type
		puzzleType() {
			return this.$store.state.sessions[this.$store.state.currentSession].puzzleType;
		},
		// The current session ID
		currentSession() {
			return this.$store.state.currentSession;
		},
		// The store of pregenerated scrambles for the current puzzle type
		scrambles() {
			return this.$store.state.scrambles[this.puzzleType];
		},
	},
	methods: {
		// Save the solve to the store
		addSolve(time) {
			this.$store.commit('addSolve', {
				solveId: this.solveId,
				solve: {
					session: this.currentSession,
					scramble: this.scramble,
					time,
					dnf: false,
					p2: false,
				},
			});

			// Create a new solve
			this.newSolve();
		},
		// Set the data for a new solve
		newSolve() {
			this.previousSolveId = this.solveId;
			this.solveId = String(Date.now());
		},
		// Reset when the previous solve is deleted
		onDeleted() {
			this.timerStatus = 'idle';
			this.previousSolveId = null;
		},
		// Reset the solve
		resetSolve() {
			this.scrambleStatus = 'ready';
			this.timerStatus = 'idle';
			this.previousSolveId = null;
			this.solveId = String(Date.now());
			this.scramble = '';
		},
	},
	watch: {
		// If the session changes, reset the solve
		currentSession() {
			this.resetSolve();
		},
	},
};
</script>

<style scoped>
.timer {
	padding: 1.5rem 0;
}
</style>
