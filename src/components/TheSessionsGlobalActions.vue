<template>
	<GlobalActions>
		<ButtonNewSession/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import ButtonNewSession from '@/components/ButtonNewSession.vue';

export default {
	name: 'TheSessionsGlobalActions',
	components: {
		GlobalActions,
		ButtonNewSession,
	},
};
</script>

<style scoped>

</style>
