<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('deleteSolve')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<p>{{ $t('deleteSolveConfirmation') }}</p>
			</div>
		</div>

		<div class="footer">
			<BaseButton :name="$t('delete')" type="danger" @click="submit()"/>
			<BaseButton :name="$t('cancel')" type="secondary" @click="$emit('close')"/>
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
