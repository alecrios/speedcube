<template>
	<BaseWrapper>
		<EmptyContent v-if="!sessionSolves.length" message="No solves to display."/>

		<TheSolves v-if="sessionSolves.length"/>
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
		sessionSolves() {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session
					=== this.$store.state.currentSession);
		},
	},
};
</script>
