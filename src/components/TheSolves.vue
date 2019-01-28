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
					v-for="(solve, index) in solves"
					:key="index"
					:class="{'is-dnf': solve.dnf}"
				>
					<td class="time align-right">
						{{ solve.time | formatTime }}
					</td>

					<td class="scramble overflow-ellipses">
						<ScrambleString :scramble="solve.scramble"/>
					</td>

					<td class="actions">
						<TheSolvesSingleActions :index="index"/>
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
	computed: {
		solves() {
			return this.$store.getters.solves;
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
