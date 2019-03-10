<template>
	<div>
		<EmptyContent
			v-if="!$_solveIdsOfCurrentSession.length"
			:message="$t('noStatsForCurrentSession')"
		/>

		<TheStats v-if="$_solveIdsOfCurrentSession.length"/>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';
import TheStats from '@/components/TheStats.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'stats',
	mixins: [solveIdsOfCurrentSession],
	components: {
		EmptyContent,
		TheStats,
	},
};
</script>
