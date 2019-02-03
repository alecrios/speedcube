<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Delete Session" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<p>Are you sure you want to permanently delete "{{ name }}" and all its solves?</p>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Delete" type="danger" @click="submit()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'ModalDeleteSession',
	props: ['session-id'],
	components: {
		BaseModal,
		BaseHeading,
		BaseButton,
	},
	data() {
		return {
			name: this.$store.state.sessions[this.sessionId].name,
		};
	},
	methods: {
		submit() {
			this.$store.commit('removeSession', this.sessionId);
			this.$store.commit('removeSolvesOfSession', this.sessionId);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
