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
	methods: {
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
};
</script>

<style scoped>
.scramble {
	display: inline;
	font-size: inherit;
	line-height: inherit;
}

.move[data-color="white"]  {color: var(--color-white)}
.move[data-color="green"]  {color: var(--color-green)}
.move[data-color="red"]    {color: var(--color-red)}
.move[data-color="blue"]   {color: var(--color-blue)}
.move[data-color="orange"] {color: var(--color-orange)}
.move[data-color="yellow"] {color: var(--color-yellow)}
</style>
