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
				return this.$store.getters.currentSession;
			},
			set(id) {
				this.$store.commit('updateCurrentSession', id);
			},
		},
	},
	created() {
		if (!this.sessions.length) {
			this.$store.commit('addSession', 'Session 1');
			this.$store.commit('updateCurrentSession', this.sessions[0].id);
		}
	},
};
</script>

<style scoped>

</style>
