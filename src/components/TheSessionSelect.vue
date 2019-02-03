<template>
	<select class="session-select" v-model="currentSession">
		<option
			v-for="sessionId in sessionIds"
			:key="sessionId"
			:value="sessionId"
		>
			{{ $_getSessionById(sessionId).name }}
		</option>
	</select>
</template>

<script>
import getSessionById from '@/mixins/getSessionById';

export default {
	name: 'TheSessionSelect',
	mixins: [getSessionById],
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
};
</script>

<style scoped>
.session-select {
	font-size: .75rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	background-color: var(--color-gray-6);
	color: var(--color-white);
	padding: .25rem 1.5rem .25rem .75rem;
	background-image: url('../assets/icon-select.svg');
	background-size: 1rem 1rem;
	background-position: calc(100% - .25rem) 50%;
	background-repeat: no-repeat;
	border-radius: .25rem;
}
</style>
