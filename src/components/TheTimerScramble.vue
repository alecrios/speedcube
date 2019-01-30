<template>
	<div class="scramble-display">
		<div>
			<ScrambleString :scramble="scrambleFirstHalf"/>
		</div>

		<div>
			<ScrambleString :scramble="scrambleSecondHalf"/>
		</div>
	</div>
</template>

<script>
import * as scrambler from 'sr-scrambler';
import ScrambleString from '@/components/ScrambleString.vue';

export default {
	name: 'TheTimerScramble',
	components: {
		ScrambleString,
	},
	data() {
		return {
			turnsToGenerate: {
				2: 10,
				3: 20,
				4: 30,
				5: 40,
			},
		};
	},
	computed: {
		cubeSize() {
			return this.$store.state.sessions[this.$store.state.currentSession].cubeSize;
		},
		scramble() {
			return this.$store.state.currentSolve.scramble;
		},
		scrambleFirstHalf() {
			return this.scramble.slice(0, 10);
		},
		scrambleSecondHalf() {
			return this.scramble.slice(10, 20);
		},
	},
	methods: {
		getScramble() {
			return scrambler.generateScramble(this.cubeSize, this.turnsToGenerate[this.cubeSize]);
		},
		updateScramble() {
			this.$store.commit('updateCurrentSolveScramble', this.getScramble());
		},
	},
	mounted() {
		if (!this.scramble.length) this.updateScramble();

		this.$root.$on('reset', this.updateScramble);
	},
	beforeDestroy() {
		this.$root.$off('reset', this.updateScramble);
	},
};
</script>

<style scoped>
.scramble-display {
	padding: 1.5rem;
	font-size: 1.5rem;
	line-height: 2.25rem;
	text-align: center;
}
</style>
