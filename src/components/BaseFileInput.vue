<template>
	<input
		type="file"
		:id="name | toKebabCase"
		@change="$emit('change', $event)"
	>
</template>

<script>
export default {
	name: 'BaseFileInput',
	props: ['name'],
};
</script>

<style scoped>

</style>
