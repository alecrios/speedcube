<template>
	<div>
		<BaseIcon
			icon="remove"
			name="Delete"
			@click="showModal = true"
			:disabled="isCurrentSession()"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalDeleteSession v-if="showModal" @close="showModal = false" :session-id="sessionId"/>
		</Portal>
	</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
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
		BaseIcon,
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
