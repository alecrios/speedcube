<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('changeSolveStatus')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel
					field-id="status"
					:name="$t('status')"
				/>

				<BaseRadioGroup
					id="status"
					:name="$t('status')"
					:options="statuses"
					v-model="status"
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
	name: 'ModalChangeSolveStatus',
	props: ['solve-id'],
	data() {
		return {
			status: this.$store.state.solves[this.solveId].status,
		};
	},
	computed: {
		statuses() {
			return [
				{
					label: 'OK',
					value: 'OK',
				},
				{
					label: `+2 (${this.$t('plus2Seconds')})`,
					value: '+2',
				},
				{
					label: `DNF (${this.$t('didNotFinish')})`,
					value: 'DNF',
				},
			];
		},
	},
	methods: {
		submit() {
			this.$store.commit('setSolveStatus', {
				id: this.solveId,
				status: this.status,
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
