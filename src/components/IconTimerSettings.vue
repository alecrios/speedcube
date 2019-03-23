<template>
	<div>
		<BaseIcon
			icon="gear"
			:name="$t('timerSettings')"
			@click="showModal = true"
			:disabled="disabled"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalTimerSettings
				v-if="showModal"
				@close="showModal = false"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalTimerSettings from '@/components/ModalTimerSettings.vue';

export default {
	name: 'IconTimerSettings',
	props: ['disabled'],
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalTimerSettings,
	},
};
</script>

<style scoped>

</style>
