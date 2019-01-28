<template>
	<select class="session-select" v-model="currentSession">
		<option
			v-for="sessionId in sessionIds"
			:key="sessionId"
			:value="sessionId"
		>
			{{ getSession(sessionId).name }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'TheSessionSelect',
	computed: {
		sessionIds() {
			return this.$store.state.sessionIds;
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
	methods: {
		getSession(sessionId) {
			return this.$store.state.sessions[sessionId];
		},
	},
	created() {
		if (!this.$store.state.sessionIds.length) {
			const id = String(Date.now());
			const name = 'Session 1';

			this.$store.commit('addSession', {id, name});
			this.$store.commit('updateCurrentSession', id);
		}
	},
};
</script>

<style scoped>

</style>
