<template>
	<div>
		<ButtonCreateSolve/>

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
					:class="{'is-dnf': getSolve(solveId).dnf}"
				>
					<td class="time align-right">
						{{ getSolve(solveId).time | formatTime }}
					</td>

					<td class="scramble overflow-ellipses">
						<ScrambleString :scramble="getSolve(solveId).scramble"/>
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
import ButtonCreateSolve from '@/components/ButtonCreateSolve.vue';
import BaseTable from '@/components/BaseTable.vue';
import IconPenalizeSolve from '@/components/IconPenalizeSolve.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import ScrambleString from '@/components/ScrambleString.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'TheSolves',
	mixins: [solveIdsOfCurrentSession],
	components: {
		ButtonCreateSolve,
		BaseTable,
		ScrambleString,
		IconPenalizeSolve,
		IconDeleteSolve,
	},
	methods: {
		getSolve(solveId) {
			return this.$store.state.solves[solveId];
		},
	},
};
</script>

<style scoped>
.actions {
	display: flex;
	justify-content: flex-end;
}

.actions > * + * {
	margin-left: .375rem;
}
</style>
