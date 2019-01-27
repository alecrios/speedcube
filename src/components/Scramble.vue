<template>
	<div class="scramble">
		<span
			v-for="(move, index) in scramble"
			:key="index"
			:data-color="getColor(move)"
			class="move"
		>
			{{ move }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'Scramble',
	props: ['scramble'],
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
	methods: {
		getColor(move) {
			const faceColor = move.charAt(0);

			return this.faceColors[faceColor];
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

.move[data-color='white']  {color: var(--color-white)}
.move[data-color='green']  {color: var(--color-green)}
.move[data-color='red']    {color: var(--color-red)}
.move[data-color='blue']   {color: var(--color-blue)}
.move[data-color='orange'] {color: var(--color-orange)}
.move[data-color='yellow'] {color: var(--color-yellow)}
</style>
