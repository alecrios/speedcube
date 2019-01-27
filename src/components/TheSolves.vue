<template>
	<div class="solves-display">
		<div class="global-actions">
			<button
				class="remove-all"
				@click="removeAllSolves()"
				v-if="solves.length"
			>
				Clear
			</button>
		</div>

		<table v-if="solves.length">
			<tbody>
				<tr
					v-for="(solve, index) in solves"
					:key="index"
					:class="['row', {'is-dnf': solve.dnf}]"
				>
					<td class="cell time">
						{{ solve.time | formatTime }}
					</td>

					<td class="cell scramble">
						<Scramble :scramble="solve.scramble"/>
					</td>

					<td class="cell actions">
						<SolveActions
							:solve="solve"
							@click-dnf="toggleDnf(index)"
							@click-p2="toggleP2(index)"
							@click-remove="removeSolve(index)"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import SolveActions from '@/components/SolveActions.vue';
import Scramble from '@/components/Scramble.vue';

export default {
	name: 'TheSolves',
	components: {
		Scramble,
		SolveActions,
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
		removeAllSolves() {
			this.$store.commit('removeAllSolves');
		},
	},
};
</script>

<style scoped>
.global-actions {
	display: flex;
	justify-content: flex-end;
}

.remove-all {
	font-size: .75rem;
	font-weight: 500;
	line-height: 1.5rem;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	color: var(--color-gray-9);
	padding: .75rem;
	cursor: pointer;
}

.remove-all:hover {
	color: var(--color-white);
}

.solves-display {
	padding: 0 1.5rem;
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
