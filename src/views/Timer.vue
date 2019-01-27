<template>
	<BaseWrapper>
		<TheTimer/>
	</BaseWrapper>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import TheTimer from '@/components/TheTimer.vue';

export default {
	name: 'timer',
	components: {
		BaseWrapper,
		TheTimer,
	},
};
</script>
