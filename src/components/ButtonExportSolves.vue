<template>
	<div>
		<BaseButton
			:name="$t('exportSolves')"
			size="small"
			type="primary"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalExportSolves v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import ModalExportSolves from '@/components/ModalExportSolves.vue';

export default {
	name: 'ButtonExportSolves',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalExportSolves,
	},
};
</script>

<style scoped>

</style>
