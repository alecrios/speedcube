<template>
	<div class="empty-content">
		<div class="message">{{ message }}</div>
	</div>
</template>

<script>
export default {
	name: 'EmptyContent',
	props: ['message'],
};
</script>

<style scoped>
.empty-content {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
}

.message {
	font-size: 1.25rem;
	line-height: 1.5rem;
	color: var(--color-gray-9);
}
</style>
