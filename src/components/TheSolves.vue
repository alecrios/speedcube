<template>
	<div>
		<TheSolvesGlobalActions/>

		<BaseTable>
			<thead>
				<tr>
					<th class="align-right">Time</th>
					<th>Scramble</th>
					<th class="align-right">Actions</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="solveId in solveIds"
					:key="solveId"
					:class="{'is-dnf': getSolve(solveId).dnf}"
				>
					<td class="time align-right">
						{{ getSolve(solveId).time | formatTime }}
					</td>

					<td class="scramble overflow-ellipses">
						<ScrambleString :scramble="getSolve(solveId).scramble"/>
					</td>

					<td class="actions">
						<TheSolvesSingleActions :solve-id="solveId"/>
					</td>
				</tr>
			</tbody>
		</BaseTable>
	</div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import TheSolvesSingleActions from '@/components/TheSolvesSingleActions.vue';
import TheSolvesGlobalActions from '@/components/TheSolvesGlobalActions.vue';
import ScrambleString from '@/components/ScrambleString.vue';

export default {
	name: 'TheSolves',
	components: {
		BaseTable,
		ScrambleString,
		TheSolvesSingleActions,
		TheSolvesGlobalActions,
	},
	methods: {
		getSolve(solveId) {
			return this.$store.state.solves[solveId];
		},
	},
	computed: {
		solveIds() {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session
					=== this.$store.state.currentSession);
		},
	},
};
</script>

<style scoped>
.is-dnf .time {
	opacity: .25;
}

.is-dnf .scramble {
	opacity: .25;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
