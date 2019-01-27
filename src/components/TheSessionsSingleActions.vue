<template>
	<div class="session-actions">
		<div class="rename-action">
			<IconButton
				icon="rename"
				name="Rename"
				@click="$emit('click-rename')"
			/>
		</div>

		<div class="remove-action">
			<IconButton
				icon="remove"
				name="Remove"
				@click="$emit('click-remove')"
			/>
		</div>
	</div>
</template>

<script>
import IconButton from '@/components/IconButton.vue';

export default {
	name: 'TheSessionsSingleActions',
	components: {
		IconButton,
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
