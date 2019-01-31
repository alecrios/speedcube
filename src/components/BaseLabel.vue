<template>
	<label :for="name | toKebabCase">{{ name }}</label>
</template>

<script>
export default {
	name: 'BaseLabel',
	props: ['name'],
};
</script>

<style scoped>
label {
	display: block;
	font-size: .75rem;
	line-height: 1.5rem;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	font-weight: 500;
	color: var(--color-white);
}
</style>
