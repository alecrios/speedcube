<template>
	<main>
		<BaseWrapper>
			<TheSessions/>
		</BaseWrapper>
	</main>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import TheSessions from '@/components/TheSessions.vue';

export default {
	name: 'sessions',
	components: {
		BaseWrapper,
		TheSessions,
	},
};
</script>
