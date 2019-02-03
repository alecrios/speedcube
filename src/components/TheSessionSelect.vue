<template>
	<div class="container">
		<BaseSelect name="Cube Type" v-model="currentSession" :options="sessions"/>
	</div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue';

export default {
	name: 'TheSessionSelect',
	components: {
		BaseSelect,
	},
	computed: {
		sessions() {
			return this.$store.state.sessionIds.map((sessionId) => ({
				value: sessionId,
				label: this.$store.state.sessions[sessionId].name,
			}));
		},
		currentSession: {
			get() {
				return this.$store.state.currentSession;
			},
			set(id) {
				this.$store.commit('updateCurrentSession', id);
			},
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 10rem;
}
</style>
