<template>
	<main>
		<BaseWrapper>
			<EmptyContent
				message="Page not found"
			/>
		</BaseWrapper>
	</main>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import EmptyContent from '@/components/EmptyContent.vue';

export default {
	name: 'not-found',
	components: {
		BaseWrapper,
		EmptyContent,
	},
};
</script>
