<template>
	<div class="scramble-display">
		<div class="container">
			<ScrambleString :scramble="scramble"/>
		</div>
	</div>
</template>

<script>
import * as scrambler from 'sr-scrambler';
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
			return scrambler.generateScramble(this.cubeSize, this.turnsToGenerate[this.cubeSize]);
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
	mounted() {
		this.updateScramble();
	},
};
</script>

<style scoped>
.scramble-display {
	padding: 1.5rem;
}

.container {
	max-width: 20rem;
	margin: 0 auto;
	text-align: center;
	font-size: 1.5rem;
	line-height: 2.25rem;
}
</style>
