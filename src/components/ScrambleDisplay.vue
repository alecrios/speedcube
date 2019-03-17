<template>
	<div
		:class="['scramble-display', display]"
		:title="display === 'inline' ? scramble : ''"
	>
		<div :class="puzzleCategory" v-if="puzzleCategory === 'cube'">
			<span
				class="turn"
				v-for="(turn, index) in cubeTurns"
				:key="index"
				:data-color="getCubeFaceColor(turn)"
			>
				{{ turn }}
			</span>
		</div>

		<div :class="puzzleCategory" v-else-if="puzzleCategory === 'megaminx'">
			<span class="scramble" v-html="display === 'block' ? megaminxTurnGroups : scramble"></span>
		</div>

		<div :class="puzzleCategory" v-else>
			<span class="scramble">{{ scramble }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScrambleDisplay',
	props: ['scramble', 'puzzle-type', 'display'],
	data() {
		return {
			cubeFaceColors: {
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
		puzzleCategory() {
			switch (this.puzzleType) {
			case '2x2x2':
			case '3x3x3':
			case '4x4x4':
			case '5x5x5':
			case '6x6x6':
			case '7x7x7':
				// Cube scrambles need to be color coded
				return 'cube';
			case 'megaminx':
				// Megaminx scrambles need to insert line breaks for block display
				return 'megaminx';
			default:
				// All other scrambles can be styled generically
				return 'other';
			}
		},
		cubeTurns() {
			// Split the scramble string into an array of turns based on whitespace
			return this.scramble.split(/\s+/);
		},
		megaminxTurnGroups() {
			// Split the scramble string into an array of turn groups based on the U turn
			const turnGroups = this.scramble.match(/((R([+-]{1,2}) D([+-]{1,2})) ){5}(U(')*)/g);

			return turnGroups.join('<br>');
		},
	},
	methods: {
		getCubeFaceColor(turn) {
			// Find the first letter in the turn and get the color for that face
			const face = turn.match(/[UFRBLD]{1}/)[0];

			return this.cubeFaceColors[face];
		},
	},
};
</script>

<style scoped>
.scramble-display.inline {
	display: inline;
	font-size: inherit;
	line-height: inherit;
}

/* Cube
----------------------------- */

.scramble-display.inline .cube {
	display: inline;
}

.scramble-display.block .cube {
	margin: 0 auto;
	text-align: center;
	max-width: 22rem;
	font-size: 1.5rem;
	line-height: 2.25rem;
}

.scramble-display .cube .turn[data-color='white']  {color: var(--color-cube-white)}
.scramble-display .cube .turn[data-color='green']  {color: var(--color-cube-green)}
.scramble-display .cube .turn[data-color='red']    {color: var(--color-cube-red)}
.scramble-display .cube .turn[data-color='blue']   {color: var(--color-cube-blue)}
.scramble-display .cube .turn[data-color='orange'] {color: var(--color-cube-orange)}
.scramble-display .cube .turn[data-color='yellow'] {color: var(--color-cube-yellow)}

/* Megaminx
----------------------------- */

.scramble-display.inline .megaminx {
	display: inline;
}

.scramble-display.block .megaminx {
	margin: 0 auto;
	text-align: center;
	max-width: 22rem;
	font-size: 1rem;
	line-height: 1.5rem;
}

@media (min-width: 36rem) {
	.scramble-display.block .megaminx {
		max-width: 32rem;
		font-size: 1.5rem;
		line-height: 2.25rem;
	}
}

.scramble-display .megaminx .scramble {
	color: var(--color-cube-white);
}

/* Other
----------------------------- */

.scramble-display.inline .other {
	display: inline;
}

.scramble-display.block .other {
	margin: 0 auto;
	text-align: center;
	max-width: 22rem;
	font-size: 1.5rem;
	line-height: 2.25rem;
}

.scramble-display .other .scramble {
	color: var(--color-cube-white);
}
</style>
