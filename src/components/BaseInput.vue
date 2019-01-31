<template>
	<input
		type="text"
		:id="name | toKebabCase"
		:placeholder="placeholder"
		:value="value"
		@input="$emit('input', $event.target.value)"
	>
</template>

<script>
export default {
	name: 'BaseInput',
	props: ['name', 'value', 'placeholder'],
};
</script>

<style scoped>
input {
	display: block;
	width: 100%;
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	padding-top: .4375rem;
	padding-bottom: .5625rem;
	padding-left: 1rem;
	padding-right: 1rem;
	color: var(--color-white);
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
	border-radius: .25rem;
}
</style>
