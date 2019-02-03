<template>
	<div>
		<TheSolvesGlobalActions/>

		<BaseTable>
			<thead>
				<tr>
					<th class="align-right">Time</th>
					<th>Scramble</th>
					<th>Edit</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="solveId in $_solveIdsOfCurrentSession"
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
import TheSolvesGlobalActions from '@/components/TheSolvesGlobalActions.vue';
import TheSolvesSingleActions from '@/components/TheSolvesSingleActions.vue';
import ScrambleString from '@/components/ScrambleString.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'TheSolves',
	mixins: [solveIdsOfCurrentSession],
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
