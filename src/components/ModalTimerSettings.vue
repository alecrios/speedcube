<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('timerSettings')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseCheckbox
					id="enable-inspection"
					:name="$t('enableInspection')"
					v-model="enableInspection"
					@submit="submit()"
				/>

				<BaseCheckbox
					v-if="enableInspection"
					id="enable-inspection-audio"
					:name="$t('enableInspectionAudio')"
					v-model="enableInspectionAudio"
					@submit="submit()"
				/>

				<BaseCheckbox
					id="hide-clock-while-solving"
					:name="$t('hideClockWhileSolving')"
					v-model="hideClockWhileSolving"
					@submit="submit()"
				/>
			</div>
		</div>

		<div class="footer">
			<BaseButton :name="$t('save')" type="primary" @click="submit()"/>
			<BaseButton :name="$t('cancel')" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
export default {
	name: 'ModalTimerSettings',
	data() {
		return {
			enableInspection: this.$store.state.settings.enableInspection,
			enableInspectionAudio: this.$store.state.settings.enableInspectionAudio,
			hideClockWhileSolving: this.$store.state.settings.hideClockWhileSolving,
		};
	},
	methods: {
		submit() {
			this.$store.commit('setEnableInspection', this.enableInspection);
			this.$store.commit('setEnableInspectionAudio', this.enableInspectionAudio);
			this.$store.commit('setHideClockWhileSolving', this.hideClockWhileSolving);

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
