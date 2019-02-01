<template>
	<GlobalActions>
		<ButtonCreateSession/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import ButtonCreateSession from '@/components/ButtonCreateSession.vue';

export default {
	name: 'TheSessionsGlobalActions',
	components: {
		GlobalActions,
		ButtonCreateSession,
	},
};
</script>

<style scoped>

</style>
