<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('deleteSession')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<p>{{ $t('deleteSessionConfirmation') }}</p>
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
	name: 'ModalDeleteSession',
	mixins: [modalComponents],
	props: ['session-id'],
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
