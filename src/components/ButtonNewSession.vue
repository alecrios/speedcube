<template>
	<div>
		<BaseButton
			name="New Session"
			:has-icon="true"
			icon="add"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalNewSession v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import ModalNewSession from '@/components/ModalNewSession.vue';

export default {
	name: 'ButtonNewSession',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseButton,
		ModalNewSession,
	},
};
</script>

<style scoped>

</style>
