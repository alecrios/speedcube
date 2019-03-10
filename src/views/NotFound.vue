<template>
	<div>
		<EmptyContent
			:message="$t('pageNotFound')"
		/>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';

export default {
	name: 'not-found',
	components: {
		EmptyContent,
	},
};
</script>
