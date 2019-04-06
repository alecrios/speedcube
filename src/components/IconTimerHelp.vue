<template>
	<div>
		<BaseIcon
			icon="help"
			:name="$t('help')"
			@click="showModal = true"
		/>

		<Portal to="modals" v-if="showModal">
			<ModalTimerHelp
				v-if="showModal"
				@close="showModal = false"
			/>
		</Portal>
	</div>
</template>

<script>
import ModalTimerHelp from '@/components/ModalTimerHelp.vue';

export default {
	name: 'IconTimerHelp',
	data() {
		return {
			showModal: false,
		};
	},
	components: {
		ModalTimerHelp,
	},
};
</script>

<style scoped>

</style>
