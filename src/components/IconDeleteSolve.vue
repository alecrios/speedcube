<template>
	<div>
		<BaseIcon
			icon="remove"
			:name="$t('delete')"
			@click="showModal = true"
			:disabled="disabled"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalDeleteSolve
				v-if="showModal"
				@close="showModal = false"
				:solve-id="solveId"
				@deleted="$emit('deleted')"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalDeleteSolve from '@/components/ModalDeleteSolve.vue';

export default {
	name: 'IconDeleteSolve',
	props: ['solve-id', 'disabled'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalDeleteSolve,
	},
};
</script>

<style scoped>

</style>
