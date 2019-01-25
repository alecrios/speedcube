<template>
	<div class="scramble-display">
		<div class="first-half">
			<Scramble :scramble="scrambleFirstHalf"/>
		</div>

		<div class="second-half">
			<Scramble :scramble="scrambleSecondHalf"/>
		</div>
	</div>
</template>

<script>
import * as cubeScrambler from 'cube-scrambler';
import Scramble from '@/components/Scramble.vue';

const scrambler = cubeScrambler();

export default {
	name: 'ScrambleDisplay',
	components: {
		Scramble,
	},
	props: ['scramble'],
	computed: {
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
			this.$root.$emit('new-scramble', this.getScramble());
		},
		getColor(move) {
			const face = move.charAt(0);

			switch (face) {
			case 'U':
				return 'white';
			case 'F':
				return 'green';
			case 'R':
				return 'red';
			case 'B':
				return 'blue';
			case 'L':
				return 'orange';
			case 'D':
				return 'yellow';
			default:
				return '';
			}
		},
	},
	mounted() {
		this.updateScramble();
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
