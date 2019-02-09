<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Delete Solve" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<p>Are you sure you want to permanently delete this solve?</p>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Delete" type="danger" @click="submit()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import modalComponents from '@/mixins/modalComponents';

export default {
	name: 'ModalDeleteSolve',
	mixins: [modalComponents],
	props: ['solve-id'],
	methods: {
		submit() {
			this.$store.commit('removeSolve', this.solveId);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
