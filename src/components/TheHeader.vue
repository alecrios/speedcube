<template>
	<header class="header">
		<BaseWrapper>
			<div class="bar">
				<RouterLink to="/">
					<img class="logo" src="../assets/logo.svg" alt="Speedcube">
				</RouterLink>

				<div class="session-select">
					<BaseSelect
						id="session"
						:name="$t('session')"
						v-model="currentSession"
						:options="sessions"
						size="small"
					/>
				</div>
			</div>
		</BaseWrapper>
	</header>
</template>

<script>
export default {
	name: 'TheHeader',
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
.header {
	background-color: var(--color-charcoal);
	border-top: .125rem solid var(--color-charcoal);
	border-bottom: .125rem solid var(--color-charcoal-darker);
}

.bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 .75rem;
}

.logo {
	width: 8.5625rem;
	height: 3rem;
}

.session-select {
	max-width: 10rem;
	padding: .75rem;
}
</style>
