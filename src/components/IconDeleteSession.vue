<template>
	<div>
		<BaseIcon
			icon="remove"
			:name="$t('delete')"
			@click="showModal = true"
			:disabled="isCurrentSession()"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalDeleteSession
				v-if="showModal"
				@close="showModal = false"
				:session-id="sessionId"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalDeleteSession from '@/components/ModalDeleteSession.vue';

export default {
	name: 'IconDeleteSession',
	props: ['session-id'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalDeleteSession,
	},
	methods: {
		isCurrentSession() {
			return this.sessionId === this.$store.state.currentSession;
		},
	},
};
</script>

<style scoped>

</style>
