<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('penalizeSolve')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseCheckbox
					id="did-not-finish"
					:name="`DNF (${$t('didNotFinish')})`"
					v-model="dnf"
					@submit="submit()"
				/>

				<BaseCheckbox
					id="plus-2-seconds"
					:name="`+2 (${$t('plus2Seconds')})`"
					v-model="p2"
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
import modalComponents from '@/mixins/modalComponents';

export default {
	name: 'ModalPenalizeSolve',
	mixins: [modalComponents],
	props: ['solve-id'],
	data() {
		return {
			dnf: this.$store.state.solves[this.solveId].dnf,
			p2: this.$store.state.solves[this.solveId].p2,
		};
	},
	methods: {
		submit() {
			this.$store.commit('setSolveDnf', {
				id: this.solveId,
				value: this.dnf,
			});

			this.$store.commit('setSolveP2', {
				id: this.solveId,
				value: this.p2,
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
