<template>
	<div>
		<div class="global-actions">
			<ButtonExportSolves/>
		</div>

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
					v-for="solveId in $_solveIdsOfCurrentSession"
					:key="solveId"
				>
					<td class="align-right">
						<div class="time">{{ getTime(solveId) }}</div>
					</td>

					<td class="overflow-ellipses">
						<ScrambleString :scramble="getScramble(solveId)" :show-title="true"/>
					</td>

					<td>
						<div class="actions">
							<IconPenalizeSolve :solve-id="solveId"/>
							<IconDeleteSolve :solve-id="solveId"/>
						</div>
					</td>
				</tr>
			</tbody>
		</BaseTable>
	</div>
</template>

<script>
import ButtonExportSolves from '@/components/ButtonExportSolves.vue';
import BaseTable from '@/components/BaseTable.vue';
import IconPenalizeSolve from '@/components/IconPenalizeSolve.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import ScrambleString from '@/components/ScrambleString.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'TheSolves',
	mixins: [solveIdsOfCurrentSession],
	components: {
		ButtonExportSolves,
		BaseTable,
		ScrambleString,
		IconPenalizeSolve,
		IconDeleteSolve,
	},
	computed: {
	},
	methods: {
		getSolve(solveId) {
			return this.$store.state.solves[solveId];
		},
		getScramble(solveId) {
			return this.getSolve(solveId).scramble;
		},
		getTime(solveId) {
			const solve = this.getSolve(solveId);
			const time = this.$options.filters.formatTime(solve.time);
			return solve.dnf ? 'DNF' : `${time}${solve.p2 ? '+' : ''}`;
		},
	},
};
</script>

<style scoped>
.global-actions {
	display: flex;
	justify-content: flex-end;
	padding: 0 1.5rem;
}

.actions {
	display: flex;
	justify-content: flex-end;
}

.actions > * + * {
	margin-left: .375rem;
}
</style>
