<template>
	<div>
		<BaseIcon
			icon="rename"
			:name="$t('rename')"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalRenameSession v-if="showModal" @close="showModal = false" :session-id="sessionId"/>
		</Portal>
	</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
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
		BaseIcon,
		ModalRenameSession,
	},
};
</script>

<style scoped>

</style>
