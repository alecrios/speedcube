<template>
	<GlobalActions>
		<BaseButton
			name="New Session"
			icon="add"
			@click="showModal = true"
		/>

		<ModalNewSession v-if="showModal" @close="showModal = false"/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import BaseButton from '@/components/BaseButton.vue';
import ModalNewSession from '@/components/ModalNewSession.vue';

export default {
	name: 'TheSessionsGlobalActions',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		GlobalActions,
		BaseButton,
		ModalNewSession,
	},
};
</script>

<style scoped>

</style>
