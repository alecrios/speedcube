<template>
	<div>
		<BaseButton name="Import" size="small" type="secondary" @click="showModal = true"/>

		<Portal to="modals" v-if="showModal">
			<ModalImportSession v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import ModalImportSession from '@/components/ModalImportSession.vue';

export default {
	name: 'ButtonImportSession',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseButton,
		ModalImportSession,
	},
};
</script>

<style scoped>

</style>
