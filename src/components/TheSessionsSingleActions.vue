<template>
	<div class="session-actions">
		<div class="rename-action">
			<IconButton
				icon="rename"
				name="Rename"
				@click="renameSession()"
			/>
		</div>

		<div class="remove-action">
			<IconButton
				icon="remove"
				name="Remove"
				@click="removeSession()"
				:disabled="isCurrentSession()"
			/>
		</div>
	</div>
</template>

<script>
import IconButton from '@/components/IconButton.vue';

export default {
	name: 'TheSessionsSingleActions',
	props: ['index'],
	computed: {
		sessionId() {
			return this.$store.getters.sessions[this.index].id;
		},
	},
	components: {
		IconButton,
	},
	methods: {
		isCurrentSession() {
			return this.$store.getters.currentSession === this.sessionId;
		},
		renameSession() {
			// TODO: user input
			// this.$store.commit('renameSession', this.index, name);
		},
		removeSession() {
			this.$store.commit('removeSolvesOfSession', this.sessionId);

			this.$store.commit('removeSession', this.index);
		},
	},
};
</script>

<style scoped>
.session-actions {
	display: flex;
}

.rename-action {
	margin-right: .75rem;
}
</style>
