<template>
	<BaseIcon
		:icon="$store.state.settings.isFullscreen ? 'collapse' : 'expand'"
		:name="$t('toggleFullscreen')"
		@click="$store.commit('setFullscreen', !$store.state.settings.isFullscreen)"
	/>
</template>

<script>
export default {
	name: 'IconFullscreen',
};
</script>

<style scoped>

</style>
