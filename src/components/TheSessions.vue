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
					v-for="session in sessions"
					:key="session.id"
					:class="{'is-inactive': !isActive(session.id)}"
				>
					<td class="name">
						{{ session.name }}
					</td>

					<td class="solves align-right">
						{{ getSolvesCount(session.id) }}
					</td>

					<td class="actions">
						<TheSessionsSingleActions :session="session"/>
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
		isActive(id) {
			return id === this.$store.state.currentSession;
		},
		getSolvesCount(id) {
			return this.$store.getters.solves.filter((solve) => solve.session === id).length;
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
