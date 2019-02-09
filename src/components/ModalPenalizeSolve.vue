<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Penalize Solve" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseCheckbox name="DNF (Did Not Finish)" v-model="dnf"/>
				<BaseCheckbox name="+2 (Plus 2 Seconds)" v-model="p2"/>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Save" type="primary" @click="submit()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
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
