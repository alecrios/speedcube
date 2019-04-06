<template>
	<div>
		<div class="global-actions">
			<ButtonCreateSession/>
		</div>

		<div class="table-wrapper">
			<BaseTable :has-side-padding="true">
				<thead>
					<tr>
						<th>{{ $t('session') }}</th>
						<th v-if="media === 'desktop'">{{ $t('puzzle') }}</th>
						<th class="align-right">{{ $t('solves') }}</th>
						<th class="align-right">{{ $t('edit') }}</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="sessionId in sessionsToShow"
						:key="sessionId"
						:class="{'selected': isCurrentSession(sessionId)}"
					>
						<td>
							<div class="session">
								<BaseIcon
									class="radio"
									:icon="isCurrentSession(sessionId) ? 'radioChecked' : 'radio'"
									:name="$t('selectSession')"
									@click="updateCurrentSession(sessionId)"
								/>

								<div>
									<div>{{ getName(sessionId) }}</div>

									<div class="puzzle-type" v-if="media === 'mobile'">
										{{ getPuzzleType(sessionId) }}
									</div>
								</div>
							</div>
						</td>

						<td v-if="media === 'desktop'">
							{{ getPuzzleType(sessionId) }}
						</td>

						<td class="align-right">
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
			media: 'mobile',
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
		updateCurrentSession(id) {
			this.$store.commit('updateCurrentSession', id);
		},
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
		updateMedia() {
			this.media = window.innerWidth >= 512 ? 'desktop' : 'mobile';
		},
	},
	created() {
		this.updateMedia();
		window.addEventListener('resize', this.updateMedia);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.updateMedia);
	},
};
</script>

<style scoped>
.global-actions {
	display: flex;
	justify-content: flex-end;
	padding: 0 1.5rem;
}

.table-wrapper {
	padding: 1.5rem 0;
}

.session {
	display: flex;
	align-items: center;
}

.session .radio {
	flex: none;
	margin-right: .75rem;
}

.session .puzzle-type {
	font-size: .75rem;
	line-height: 1rem;
	letter-spacing: .03125rem;
	color: var(--color-smoke);
}

.actions {
	display: flex;
	justify-content: flex-end;
}

.actions > * + * {
	margin-left: .375rem;
}
</style>
