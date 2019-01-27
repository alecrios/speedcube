<template>
	<GlobalActions>
		<BaseButton
			name="New"
			icon="add"
			@click="createNewSession()"
		/>

		<BaseButton
			name="Clear"
			icon="remove"
			@click="removeAllSessions()"
		/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'TheSessionsGlobalActions',
	components: {
		GlobalActions,
		BaseButton,
	},
	methods: {
		createNewSession() {
			//
		},
		removeAllSessions() {
			//
		},
	},
};
</script>

<style scoped>

</style>
