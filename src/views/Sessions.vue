<template>
	<div>
		<BaseWrapper>
			<EmptyContent v-if="!sessionIds.length" message="No sessions to display"/>

			<TheSessions v-if="sessionIds.length"/>
		</BaseWrapper>
	</div>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import TheSessions from '@/components/TheSessions.vue';

export default {
	name: 'sessions',
	components: {
		BaseWrapper,
		EmptyContent,
		TheSessions,
	},
	computed: {
		sessionIds() {
			return this.$store.state.sessionIds;
		},
	},
};
</script>
