<template>
	<div class="scramble">
		<span
			v-for="(move, index) in scramble"
			:key="index"
			:data-color="getColor(move)"
			class="scramble__move"
		>
			{{ move }}
		</span>
	</div>
</template>

<script>
import * as cubeScrambler from 'cube-scrambler';
import eventBus from '../eventBus';

const scrambler = cubeScrambler();

export default {
	name: 'Scramble',
	props: ['scramble'],
	methods: {
		updateScramble() {
			eventBus.emit('new-scramble', scrambler.scramble());
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
	created() {
		this.updateScramble();

		eventBus.listen('reset', this.updateScramble);
	},
};
</script>

<style scoped>
.scramble {
	padding: 1.5rem;
	font-size: 1.25rem;
	line-height: 1.5rem;
	text-align: center;
}

.scramble__move[data-color="white"]  {color: var(--color-white)}
.scramble__move[data-color="green"]  {color: var(--color-green)}
.scramble__move[data-color="red"]    {color: var(--color-red)}
.scramble__move[data-color="blue"]   {color: var(--color-blue)}
.scramble__move[data-color="orange"] {color: var(--color-orange)}
.scramble__move[data-color="yellow"] {color: var(--color-yellow)}
</style>
