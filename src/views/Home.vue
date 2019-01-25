<template>
	<div>
		<ScrambleDisplay :scramble="currentSolve.scramble"/>
		<TimeDisplay :time="currentSolve.time"/>
		<StatsDisplay/>
	</div>
</template>

<script>
import ScrambleDisplay from '@/components/ScrambleDisplay.vue';
import TimeDisplay from '@/components/TimeDisplay.vue';
import StatsDisplay from '@/components/StatsDisplay.vue';

export default {
	name: 'home',
	components: {
		ScrambleDisplay,
		TimeDisplay,
		StatsDisplay,
	},
	data() {
		return {
			currentSolve: {
				scramble: [],
				time: null,
				p2: false,
				dnf: false,
			},
		};
	},
	methods: {
		updateScramble(scramble) {
			this.currentSolve.scramble = scramble;
		},
		saveTime(time) {
			this.currentSolve.time = time;

			this.$store.commit('addSolve', Object.assign({
				timestamp: Date.now(),
			}, this.currentSolve));

			this.$root.$emit('reset');
		},
	},
	created() {
		this.$root.$on('new-scramble', this.updateScramble);
		this.$root.$on('timer-ended', this.saveTime);
	},
	beforeDestroy() {
		this.$root.$off('new-scramble', this.updateScramble);
		this.$root.$off('timer-ended', this.saveTime);
	},
};
</script>
