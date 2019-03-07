<template>
	<div>
		<BaseButton
			:name="$t('createSession')"
			size="small"
			type="primary"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalCreateSession v-if="showModal" @close="showModal = false"/>
		</Portal>
	</div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import ModalCreateSession from '@/components/ModalCreateSession.vue';

export default {
	name: 'ButtonCreateSession',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		BaseButton,
		ModalCreateSession,
	},
};
</script>

<style scoped>

</style>
