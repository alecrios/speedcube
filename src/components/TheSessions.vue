<template>
	<div>
		<ButtonCreateSession/>

		<BaseTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Cube</th>
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

					<td class="cube">
						{{ getCubeType(sessionId) }}
					</td>

					<td class="solves align-right">
						{{ getSolvesCount(sessionId) }}
					</td>

					<td>
						<div class="actions">
							<IconRenameSession :session-id="sessionId"/>
							<IconDeleteSession :session-id="sessionId"/>
						</div>
					</td>
				</tr>
			</tbody>
		</BaseTable>
	</div>
</template>

<script>
import ButtonCreateSession from '@/components/ButtonCreateSession.vue';
import BaseTable from '@/components/BaseTable.vue';
import IconRenameSession from '@/components/IconRenameSession.vue';
import IconDeleteSession from '@/components/IconDeleteSession.vue';

import getSessionById from '@/mixins/getSessionById';

export default {
	name: 'TheSessions',
	mixins: [getSessionById],
	components: {
		ButtonCreateSession,
		BaseTable,
		IconRenameSession,
		IconDeleteSession,
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

.actions > * + * {
	margin-left: .375rem;
}
</style>
