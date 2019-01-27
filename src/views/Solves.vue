<template>
	<BaseWrapper>
		<EmptyContent v-if="!solves.length" message="No solves to display."/>

		<TheSolves v-if="solves.length"/>
	</BaseWrapper>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheSolves from '@/components/TheSolves.vue';

export default {
	name: 'solves',
	components: {
		BaseWrapper,
		EmptyContent,
		TheSolves,
	},
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
};
</script>
