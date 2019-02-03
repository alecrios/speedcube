<template>
	<div>
		<Icon
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
import Icon from '@/components/Icon.vue';
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
		Icon,
		ModalDeleteSolve,
	},
};
</script>

<style scoped>

</style>
