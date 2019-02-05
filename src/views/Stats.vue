<template>
	<main>
		<BaseWrapper>
			<EmptyContent
				v-if="!$_solveIdsOfCurrentSession.length"
				message="No stats for the current session"
			/>

			<TheStats v-if="$_solveIdsOfCurrentSession.length"/>
		</BaseWrapper>
	</main>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheStats from '@/components/TheStats.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'stats',
	mixins: [solveIdsOfCurrentSession],
	components: {
		BaseWrapper,
		EmptyContent,
		TheStats,
	},
};
</script>
