<template>
	<div class="scramble-display">
		<div class="container">
			<ScrambleString :scramble="scramble"/>
		</div>
	</div>
</template>

<script>
// Generates random-state scrambles for 3x3x3
import min2phase from '@/lib/min2phase';

// Generates random-move scrambles for NxNxN
import * as scrambler from 'sr-scrambler';

// Converts string scrambles (min2phase output format) into arrays (sr-scrambler output format)
import convertScrambleStringToArray from '@/lib/convertScrambleStringToArray';

// Displays a scramble array in the DOM
import ScrambleString from '@/components/ScrambleString.vue';

export default {
	name: 'TheTimerScramble',
	props: ['scramble', 'solve-id'],
	components: {
		ScrambleString,
	},
	data() {
		return {
			turnsToGenerate: {
				2: 10,
				3: 20,
				4: 40,
				5: 60,
			},
		};
	},
	computed: {
		cubeSize() {
			return this.$store.state.sessions[this.$store.state.currentSession].cubeSize;
		},
	},
	methods: {
		getScramble() {
			// For 3x3x3, generate a random-state scramble
			if (this.cubeSize === 3) {
				const randomCube = min2phase.randomCube();
				const scrambleString = min2phase.solve(randomCube);
				const scrambleArray = convertScrambleStringToArray(scrambleString);
				return scrambleArray;
			}

			// For NxNxN, generate a random-move scramble
			const turns = this.turnsToGenerate[this.cubeSize];
			const scrambleArray = scrambler.generateScramble(this.cubeSize, turns);
			return scrambleArray;
		},
		updateScramble() {
			this.$emit('new-scramble', this.getScramble());
		},
	},
	watch: {
		solveId() {
			this.updateScramble();
		},
	},
	create() {
		min2phase.initFull();
	},
	mounted() {
		this.updateScramble();
	},
};
</script>

<style scoped>
.scramble-display {
	padding: 0 1.5rem;
}

.container {
	max-width: 22rem;
	margin: 0 auto;
	text-align: center;
	font-size: 1.5rem;
	line-height: 2.25rem;
}
</style>
