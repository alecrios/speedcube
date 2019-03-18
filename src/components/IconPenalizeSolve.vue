<template>
	<div>
		<BaseIcon
			icon="penalty"
			:name="$t('penalize')"
			@click="showModal = true"
			:disabled="disabled"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalPenalizeSolve
				v-if="showModal"
				@close="showModal = false"
				:solve-id="solveId"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalPenalizeSolve from '@/components/ModalPenalizeSolve.vue';

export default {
	name: 'IconPenalizeSolve',
	props: ['solve-id', 'disabled'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalPenalizeSolve,
	},
};
</script>

<style scoped>

</style>
