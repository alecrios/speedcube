<template>
	<BaseWrapper>
		<EmptyContent v-if="!solveIds.length" message="No stats to display."/>

		<TheStats v-if="solveIds.length"/>
	</BaseWrapper>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheStats from '@/components/TheStats.vue';

export default {
	name: 'stats',
	components: {
		BaseWrapper,
		EmptyContent,
		TheStats,
	},
	computed: {
		solveIds() {
			return this.$store.state.solveIds;
		},
	},
};
</script>
