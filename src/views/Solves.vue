<template>
	<div>
		<EmptyContent
			v-if="!$_solveIdsOfCurrentSession.length"
			:message="$t('noSolvesInCurrentSession')"
		/>

		<div v-if="$_solveIdsOfCurrentSession.length">
			<div class="global-actions">
				<ButtonExportSolves/>
			</div>

			<BaseTable>
				<thead>
					<tr>
						<th class="align-right">{{ $t('time') }}</th>
						<th>{{ $t('scramble') }}</th>
						<th class="align-right">{{ $t('actions') }}</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="solveId in solvesToShow"
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

			<ButtonLoadMore
				:pages-visible="pagesVisible"
				:total-pages="totalPages"
				@click="pagesVisible += 1"
			/>
		</div>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';
import ButtonExportSolves from '@/components/ButtonExportSolves.vue';
import IconPenalizeSolve from '@/components/IconPenalizeSolve.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import ScrambleString from '@/components/ScrambleString.vue';
import ButtonLoadMore from '@/components/ButtonLoadMore.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'Solves',
	mixins: [solveIdsOfCurrentSession],
	components: {
		EmptyContent,
		ButtonExportSolves,
		ScrambleString,
		IconPenalizeSolve,
		IconDeleteSolve,
		ButtonLoadMore,
	},
	data() {
		return {
			pageSize: 25,
			pagesVisible: 1,
		};
	},
	computed: {
		totalPages() {
			return Math.ceil(this.$_solveIdsOfCurrentSession.length / this.pageSize);
		},
		solvesToShow() {
			return this.$_solveIdsOfCurrentSession.slice(0, this.pageSize * this.pagesVisible);
		},
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
