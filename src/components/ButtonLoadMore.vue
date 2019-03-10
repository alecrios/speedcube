<template>
	<div class="load-more-container">
		<BaseButton
			class="button"
			:name="$t('loadMore')"
			size="small"
			type="secondary"
			v-if="pagesVisible < totalPages"
			@click="$emit('click')"
		/>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'ButtonLoadMore',
	props: ['pages-visible', 'total-pages'],
	components: {
		BaseButton,
	},
};
</script>

<style scoped>
.load-more-container {
	display: flex;
	justify-content: center;
}

.button {
	margin-bottom: 1.5rem;
}
</style>
