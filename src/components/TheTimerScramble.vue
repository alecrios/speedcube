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
import cubeScrambler from 'cube-scrambler';
import ScrambleString from '@/components/ScrambleString.vue';

const scrambler = cubeScrambler();

export default {
	name: 'TheTimerScramble',
	components: {
		ScrambleString,
	},
	computed: {
		scramble() {
			return this.$store.getters.currentSolveScramble;
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
			return scrambler.scramble().slice(0, 20);
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
