<template>
	<div>
		<TheSessionsGlobalActions/>

		<BaseTable>
			<thead>
				<tr>
					<th>Name</th>
					<th class="align-right">Cube</th>
					<th class="align-right">Solves</th>
					<th class="align-right">Actions</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="sessionId in sessionIds"
					:key="sessionId"
					:class="{'is-inactive': !isActive(sessionId)}"
				>
					<td class="name">
						{{ getName(sessionId) }}
					</td>

					<td class="cube align-right">
						{{ getCubeType(sessionId) }}
					</td>

					<td class="solves align-right">
						{{ getSolvesCount(sessionId) }}
					</td>

					<td class="actions">
						<TheSessionsSingleActions :session-id="sessionId"/>
					</td>
				</tr>
			</tbody>
		</BaseTable>
	</div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import TheSessionsSingleActions from '@/components/TheSessionsSingleActions.vue';
import TheSessionsGlobalActions from '@/components/TheSessionsGlobalActions.vue';

import getSessionById from '@/mixins/getSessionById';

export default {
	name: 'TheSessions',
	mixins: [getSessionById],
	components: {
		BaseTable,
		TheSessionsSingleActions,
		TheSessionsGlobalActions,
	},
	computed: {
		sessionIds() {
			return this.$store.state.sessionIds;
		},
	},
	methods: {
		getName(id) {
			return this.$_getSessionById(id).name;
		},
		getCubeType(id) {
			const size = this.$_getSessionById(id).cubeSize;
			return `${size}×${size}×${size}`;
		},
		getSolvesCount(id) {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session === id).length;
		},
		isActive(id) {
			return id === this.$store.state.currentSession;
		},
	},
};
</script>

<style scoped>
.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
