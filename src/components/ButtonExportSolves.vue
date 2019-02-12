<template>
	<div>
		<BaseButton name="Export Solves" size="small" type="primary" @click="showModal = true"/>

		<Portal to="modals" v-if="showModal">
			<ModalExportSolves v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import ModalExportSolves from '@/components/ModalExportSolves.vue';

export default {
	name: 'ButtonExportSolves',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseButton,
		ModalExportSolves,
	},
};
</script>

<style scoped>

</style>
