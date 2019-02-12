<template>
	<div>
		<BaseButton name="Export" size="small" type="secondary" @click="showModal = true"/>

		<Portal to="modals" v-if="showModal">
			<ModalExportSession v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import ModalExportSession from '@/components/ModalExportSession.vue';

export default {
	name: 'ButtonExportSession',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseButton,
		ModalExportSession,
	},
};
</script>

<style scoped>

</style>
