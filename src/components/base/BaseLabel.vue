<template>
	<label :for="fieldId">{{ name }}</label>
</template>

<script>
export default {
	name: 'BaseLabel',
	props: ['name', 'field-id'],
};
</script>

<style scoped>
label {
	display: block;
	font-size: .75rem;
	line-height: .75rem;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	font-weight: 500;
	color: var(--color-white);
}
</style>
