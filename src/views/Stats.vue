<template>
	<BaseWrapper>
		<EmptyContent v-if="!solves.length" message="No stats to display."/>

		<TheStats v-if="solves.length"/>
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
		solves() {
			return this.$store.getters.solves;
		},
	},
};
</script>
