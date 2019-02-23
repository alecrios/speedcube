<template>
	<div class="timer">
		<TheTimerScramble
			:solve-id="solveId"
			:scramble="solve.scramble"
			@new-scramble="(scramble) => { this.solve.scramble = scramble; }"
		/>

		<TheTimerClock
			:solve-id="solveId"
			@new-time="addSolve"
		/>
	</div>
</template>

<script>
import store from '@/store';

import TheTimerScramble from '@/components/TheTimerScramble.vue';
import TheTimerClock from '@/components/TheTimerClock.vue';

import addSolve from '@/mixins/addSolve';

export default {
	name: 'TheTimer',
	mixins: [addSolve],
	components: {
		TheTimerScramble,
		TheTimerClock,
	},
	data() {
		return {
			solveId: String(Date.now()),
			solve: {
				session: store.state.currentSession,
				scramble: [],
				time: null,
				dnf: false,
				p2: false,
			},
		};
	},
	computed: {
		currentSession() {
			return this.$store.state.currentSession;
		},
	},
	methods: {
		addSolve(time) {
			this.solve.time = time;
			this.$_addSolve(this.solveId, this.solve);
			this.resetSolve();
		},
		resetSolve() {
			Object.assign(this.$data, this.$options.data());
		},
	},
	watch: {
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
