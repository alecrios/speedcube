<template>
	<GlobalActions>
		<BaseButton
			name="New Session"
			icon="add"
			@click="createNewSession()"
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
			// TODO: better system of getting user input
			const id = String(Date.now());
			// eslint-disable-next-line
			const name = window.prompt('Session name:');

			this.$store.commit('addSession', {id, name});
			this.$store.commit('updateCurrentSession', id);
		},
	},
};
</script>

<style scoped>

</style>
