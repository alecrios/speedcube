<template>
	<div class="solves">
		<TheSolvesGlobalActions/>

		<table>
			<tr
				v-for="(solve, index) in solves"
				:key="index"
				:class="['row', {'is-dnf': solve.dnf}]"
			>
				<td class="cell time">
					{{ solve.time | formatTime }}
				</td>

				<td class="cell scramble">
					<ScrambleString :scramble="solve.scramble"/>
				</td>

				<td class="cell actions">
					<TheSolvesSingleActions
						:solve="solve"
						@click-dnf="toggleDnf(index)"
						@click-p2="toggleP2(index)"
						@click-remove="removeSolve(index)"
					/>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import TheSolvesSingleActions from '@/components/TheSolvesSingleActions.vue';
import TheSolvesGlobalActions from '@/components/TheSolvesGlobalActions.vue';
import ScrambleString from '@/components/ScrambleString.vue';

export default {
	name: 'TheSolves',
	components: {
		ScrambleString,
		TheSolvesSingleActions,
		TheSolvesGlobalActions,
	},
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
	methods: {
		removeSolve(index) {
			this.$store.commit('removeSolve', index);
		},
		toggleP2(index) {
			this.$store.commit('toggleP2', index);
		},
		toggleDnf(index) {
			this.$store.commit('toggleDnf', index);
		},
	},
};
</script>

<style scoped>
.solves {
	padding: 1.5rem;
}

.row + .row {
	border-top: .125rem solid var(--color-gray-3);
}

.cell {
	padding: .75rem;
	white-space: nowrap;
	vertical-align: middle;
}

.cell.time {
	text-align: right;
	font-size: 1.25rem;
	line-height: 1.5rem;
}

.row.is-dnf .cell.time {
	opacity: .25;
}

.cell.scramble {
	text-align: left;
	width: 100%;
	max-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 1rem;
	line-height: 1.5rem;
}

.row.is-dnf .cell.scramble {
	opacity: .25;
}

.cell.actions {
	display: flex;
}
</style>
