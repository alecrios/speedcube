<template>
	<div>
		<div class="global-actions">
			<ButtonCreateSession/>
		</div>

		<BaseTable>
			<thead>
				<tr>
					<th>{{ $t('name') }}</th>
					<th>{{ $t('puzzle') }}</th>
					<th class="align-right">{{ $t('solves') }}</th>
					<th class="align-right">{{ $t('actions') }}</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="sessionId in sessionsToShow"
					:key="sessionId"
					:class="{'highlight': isCurrentSession(sessionId)}"
				>
					<td class="name">
						{{ getName(sessionId) }}
					</td>

					<td class="puzzle">
						{{ getPuzzleType(sessionId) }}
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

		<ButtonLoadMore
			:pages-visible="pagesVisible"
			:total-pages="totalPages"
			@click="pagesVisible += 1"
		/>
	</div>
</template>

<script>
import ButtonCreateSession from '@/components/ButtonCreateSession.vue';
import IconRenameSession from '@/components/IconRenameSession.vue';
import IconDeleteSession from '@/components/IconDeleteSession.vue';
import ButtonLoadMore from '@/components/ButtonLoadMore.vue';

import getSessionById from '@/mixins/getSessionById';

import puzzleTypes from '@/puzzleTypes';

export default {
	name: 'Sessions',
	mixins: [getSessionById],
	components: {
		ButtonCreateSession,
		IconRenameSession,
		IconDeleteSession,
		ButtonLoadMore,
	},
	data() {
		return {
			pageSize: 25,
			pagesVisible: 1,
		};
	},
	computed: {
		sessionIds() {
			return this.$store.state.sessionIds;
		},
		totalPages() {
			return Math.ceil(this.sessionIds.length / this.pageSize);
		},
		sessionsToShow() {
			return this.sessionIds.slice(0, this.pageSize * this.pagesVisible);
		},
		puzzleTypes() {
			return puzzleTypes
				.reduce((obj, type) => (Object.assign(obj, {[type.value]: type.label})), {});
		},
	},
	methods: {
		getName(id) {
			return this.$_getSessionById(id).name;
		},
		getPuzzleType(id) {
			return this.puzzleTypes[this.$_getSessionById(id).puzzleType];
		},
		getSolvesCount(id) {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session === id).length;
		},
		isCurrentSession(id) {
			return id === this.$store.state.currentSession;
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
