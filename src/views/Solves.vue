<template>
	<main>
		<BaseWrapper>
			<EmptyContent
				v-if="!$_solveIdsOfCurrentSession.length"
				:message="$t('noSolvesInCurrentSession')"
			/>

			<TheSolves v-if="$_solveIdsOfCurrentSession.length"/>
		</BaseWrapper>
	</main>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheSolves from '@/components/TheSolves.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'solves',
	mixins: [solveIdsOfCurrentSession],
	components: {
		BaseWrapper,
		EmptyContent,
		TheSolves,
	},
};
</script>
