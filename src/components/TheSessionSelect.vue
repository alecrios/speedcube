<template>
	<select class="session-select" v-model="currentSession">
		<option
			v-for="session in sessions"
			:key="session.id"
			:value="session.id"
		>
			{{ session.name }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'TheSessionSelect',
	computed: {
		sessions() {
			return this.$store.getters.sessions;
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
	created() {
		if (!this.$store.getters.sessions.length) {
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
