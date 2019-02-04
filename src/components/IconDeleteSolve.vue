<template>
	<div>
		<BaseIcon
			icon="remove"
			name="Delete"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalDeleteSolve v-if="showModal" @close="showModal = false" :solve-id="solveId"/>
		</Portal>
	</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
import ModalDeleteSolve from '@/components/ModalDeleteSolve.vue';

export default {
	name: 'IconDeleteSolve',
	props: ['solve-id'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseIcon,
		ModalDeleteSolve,
	},
};
</script>

<style scoped>

</style>
