<template>
	<div class="base-wrapper">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'BaseWrapper',
};
</script>

<style scoped>
.base-wrapper {
	width: 100%;
	max-width: 48rem;
	margin: 0 auto;
}
</style>
