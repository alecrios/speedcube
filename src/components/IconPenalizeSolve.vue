<template>
	<div>
		<Icon
			icon="penalty"
			name="Penalize"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalPenalizeSolve v-if="showModal" @close="showModal = false" :solve-id="solveId"/>
		</Portal>
	</div>
</template>

<script>
import Icon from '@/components/Icon.vue';
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
		Icon,
		ModalPenalizeSolve,
	},
};
</script>

<style scoped>

</style>
