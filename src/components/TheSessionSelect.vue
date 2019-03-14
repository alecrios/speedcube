<template>
	<div class="container">
		<BaseSelect
			id="session"
			:name="$t('session')"
			v-model="currentSession"
			:options="sessions"
			size="small"
		/>
	</div>
</template>

<script>
export default {
	name: 'TheSessionSelect',
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
	padding: .75rem;
}
</style>
