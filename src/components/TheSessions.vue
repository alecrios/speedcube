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
					v-for="(session, index) in sessions"
					:key="session.id"
					:class="{'is-inactive': isInactive(session)}"
				>
					<td class="name">
						{{ session.name }}
					</td>

					<td class="solves align-right">
						{{ getSessionSolvesCount(session.id) }}
					</td>

					<td class="actions">
						<TheSessionsSingleActions :index="index"/>
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
		sessions() {
			return this.$store.getters.sessions;
		},
	},
	methods: {
		isInactive(session) {
			return session.id !== this.$store.getters.currentSession;
		},
		getSessionSolvesCount(sessionId) {
			return this.$store.getters.solves.filter((solve) => solve.session === sessionId).length;
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
