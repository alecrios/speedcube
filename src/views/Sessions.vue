<template>
	<BaseWrapper>
		<EmptyContent v-if="!sessions.length" message="No sessions to display."/>

		<TheSessions v-if="sessions.length"/>
	</BaseWrapper>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheSessions from '@/components/TheSessions.vue'; // TODO: remove this comment

export default {
	name: 'solves',
	components: {
		BaseWrapper,
		EmptyContent,
		TheSessions,
	},
	computed: {
		sessions() {
			return this.$store.getters.sessions;
		},
	},
};
</script>
