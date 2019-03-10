<template>
	<div>
		<EmptyContent
			v-if="!$_solveIdsOfCurrentSession.length"
			:message="$t('noSolvesInCurrentSession')"
		/>

		<TheSolves v-if="$_solveIdsOfCurrentSession.length"/>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';
import TheSolves from '@/components/TheSolves.vue';

import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'solves',
	mixins: [solveIdsOfCurrentSession],
	components: {
		EmptyContent,
		TheSolves,
	},
};
</script>
