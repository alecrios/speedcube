<template>
	<input
		type="text"
		:placeholder="placeholder"
		:value="value"
		@input="$emit('input', $event.target.value)"
	>
</template>

<script>
export default {
	name: 'BaseInput',
	props: ['value', 'placeholder'],
};
</script>

<style scoped>
input {
	font-size: 1rem;
	line-height: 1.5rem;
	padding: .5rem .75rem;
	color: var(--color-white);
}
</style>
