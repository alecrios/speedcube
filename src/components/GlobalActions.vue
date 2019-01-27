<template>
	<div class="global-actions">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'GlobalActions',
};
</script>

<style scoped>
.global-actions {
	padding: 0 1.5rem;
	margin-bottom: 1.5rem;
	display: flex;
	justify-content: flex-end;
}

.global-actions > * + * {
	margin-left: .75rem;
}
</style>
