<template>
	<div class="scramble" :title="showTitle ? title : ''">
		<span
			v-for="(turn, index) in scramble"
			:key="index"
			:data-color="getColor(turn)"
			class="turn"
		>
			{{ $_getScrambleTurnText(turn) }}
		</span>
	</div>
</template>

<script>
import getScrambleTurnText from '@/mixins/getScrambleTurnText';

export default {
	name: 'ScrambleString',
	mixins: [getScrambleTurnText],
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
			return this.scramble.map((turn) => this.$_getScrambleTurnText(turn)).join(' ');
		},
	},
	methods: {
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
