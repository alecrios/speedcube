<template>
	<div>
		<TheTimerScramble
			:solve-id="solveId"
			:scramble="solve.scramble"
			@new-scramble="(scramble) => { this.solve.scramble = scramble; }"
		/>

		<TheTimerClock
			:solve-id="solveId"
			@new-time="xxx"
		/>
	</div>
</template>

<script>
import TheTimerScramble from '@/components/TheTimerScramble.vue';
import TheTimerClock from '@/components/TheTimerClock.vue';

// import addSolve from '@/mixins/addSolve';

export default {
	name: 'TheTimer',
	// mixins: [addSolve],
	components: {
		TheTimerScramble,
		TheTimerClock,
	},
	data() {
		return {
			solveId: String(Date.now()),
			solve: {
				session: this.$store.state.currentSession,
				scramble: [],
				time: null,
				dnf: false,
				p2: false,
			},
		};
	},
	methods: {
		xxx(time) {
			this.solve.time = time;
			// this.$_addSolve(this.solveId, this.solve);
			this.resetSolve();
		},
		resetSolve() {
			this.solveId = String(Date.now());
		},
	},
};
</script>
