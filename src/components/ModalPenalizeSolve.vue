<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Penalize Solve" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<p>XXX</p>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Save" type="primary" @click="submit()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'ModalPenalizeSolve',
	props: ['solve-id'],
	components: {
		BaseModal,
		BaseHeading,
		BaseButton,
	},
	methods: {
		submit() {
			// XXX
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
