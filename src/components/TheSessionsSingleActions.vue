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
	props: ['session'],
	components: {
		IconButton,
	},
	methods: {
		isCurrentSession() {
			return this.session.id === this.$store.state.currentSession;
		},
		renameSession() {
			// eslint-disable-next-line
			const id = this.session.id;
			// TODO: better system of getting user input
			// eslint-disable-next-line
			const name = window.prompt('Session name:', this.session.name);

			this.$store.commit('renameSession', {id, name});
		},
		removeSession() {
			this.$store.commit('removeSolvesOfSession', this.session.id);
			this.$store.commit('removeSession', this.session.id);
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
