<template>
	<div>
		<Icon
			icon="rename"
			name="Rename"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalRenameSession v-if="showModal" @close="showModal = false" :session-id="sessionId"/>
		</Portal>
	</div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import ModalRenameSession from '@/components/ModalRenameSession.vue';

export default {
	name: 'IconRenameSession',
	props: ['session-id'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		Icon,
		ModalRenameSession,
	},
};
</script>

<style scoped>

</style>
