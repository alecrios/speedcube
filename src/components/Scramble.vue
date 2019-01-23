<template>
	<div class="scramble">
		<div class="scramble__first-half">
			<span
				v-for="(move, index) in scrambleFirstHalf"
				:key="index"
				:data-color="getColor(move)"
				class="scramble__move"
			>
				{{ move }}
			</span>
		</div>

		<div class="scramble__second-half">
			<span
				v-for="(move, index) in scrambleSecondHalf"
				:key="index"
				:data-color="getColor(move)"
				class="scramble__move"
			>
				{{ move }}
			</span>
		</div>
	</div>
</template>

<script>
import * as cubeScrambler from 'cube-scrambler';

const scrambler = cubeScrambler();

export default {
	name: 'Scramble',
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
.scramble {
	padding: 1.5rem;
	font-size: 1.5rem;
	line-height: 2.25rem;
	text-align: center;
}

.scramble__move[data-color="white"]  {color: var(--color-white)}
.scramble__move[data-color="green"]  {color: var(--color-green)}
.scramble__move[data-color="red"]    {color: var(--color-red)}
.scramble__move[data-color="blue"]   {color: var(--color-blue)}
.scramble__move[data-color="orange"] {color: var(--color-orange)}
.scramble__move[data-color="yellow"] {color: var(--color-yellow)}
</style>
