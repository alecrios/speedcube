<template>
	<Component :is="type">
		{{ value }}
	</Component>
</template>

<script>
export default {
	name: 'BaseHeading',
	props: ['value', 'type'],
};
</script>

<style scoped>
h2 {
	font-size: 1.25rem;
	line-height: 1.5rem;
	text-align: center;
	color: var(--color-cube-white);
}
</style>
