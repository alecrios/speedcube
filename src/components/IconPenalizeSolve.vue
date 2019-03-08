<template>
	<div>
		<BaseIcon
			icon="penalty"
			:name="$t('penalize')"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalPenalizeSolve v-if="showModal" @close="showModal = false" :solve-id="solveId"/>
		</Portal>
	</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
import ModalPenalizeSolve from '@/components/ModalPenalizeSolve.vue';

export default {
	name: 'IconPenalizeSolve',
	props: ['solve-id'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseIcon,
		ModalPenalizeSolve,
	},
};
</script>

<style scoped>

</style>
