<template>
	<BaseIcon
		:icon="$store.state.settings.isFullscreen ? 'collapse' : 'expand'"
		:name="$t('toggleFullscreen')"
		@click="$store.commit('setFullscreen', !$store.state.settings.isFullscreen)"
	/>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
	name: 'IconFullscreen',
	components: {
		BaseIcon,
	},
};
</script>

<style scoped>

</style>
