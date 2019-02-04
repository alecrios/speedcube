<template>
	<div class="scramble" :title="title">
		<span
			v-for="(turn, index) in scramble"
			:key="index"
			:data-color="getColor(turn)"
			class="turn"
		>
			{{ getTurnText(turn) }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'ScrambleString',
	props: ['scramble', 'show-title'],
	data() {
		return {
			faceColors: {
				'U': 'white',
				'F': 'green',
				'R': 'red',
				'B': 'blue',
				'L': 'orange',
				'D': 'yellow',
			},
		};
	},
	computed: {
		title() {
			return this.scramble.map((turn) => this.getTurnText(turn)).join(' ');
		},
	},
	methods: {
		getTurnText(turn) {
			return turn.depth > 1
				? `${turn.face.toLowerCase()}${turn.modifier}`
				: `${turn.face}${turn.modifier}`;
		},
		getColor(turn) {
			return this.faceColors[turn.face];
		},
	},
};
</script>

<style scoped>
.scramble {
	display: inline;
	font-size: inherit;
	line-height: inherit;
}

.turn[data-color='white']  {color: var(--color-cube-white)}
.turn[data-color='green']  {color: var(--color-cube-green)}
.turn[data-color='red']    {color: var(--color-cube-red)}
.turn[data-color='blue']   {color: var(--color-cube-blue)}
.turn[data-color='orange'] {color: var(--color-cube-orange)}
.turn[data-color='yellow'] {color: var(--color-cube-yellow)}
</style>
