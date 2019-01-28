<template>
	<div>
		<TheSessionsGlobalActions/>

		<BaseTable>
			<thead>
				<tr>
					<th>Name</th>
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
						{{ getSession(sessionId).name }}
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

export default {
	name: 'TheSessions',
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
		getSession(sessionId) {
			return this.$store.state.sessions[sessionId];
		},
		isActive(id) {
			return id === this.$store.state.currentSession;
		},
		getSolvesCount(id) {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session === id).length;
		},
	},
};
</script>

<style scoped>
.is-inactive .name {
	opacity: .25;
}

.is-inactive .solves {
	opacity: .25;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
