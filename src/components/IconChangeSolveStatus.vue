<template>
	<div>
		<BaseIcon
			icon="status"
			:name="$t('changeStatus')"
			@click="showModal = true"
			:disabled="disabled"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalChangeSolveStatus
				v-if="showModal"
				@close="showModal = false"
				:solve-id="solveId"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalChangeSolveStatus from '@/components/ModalChangeSolveStatus.vue';

export default {
	name: 'IconChangeSolveStatus',
	props: ['solve-id', 'disabled'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalChangeSolveStatus,
	},
};
</script>

<style scoped>

</style>
