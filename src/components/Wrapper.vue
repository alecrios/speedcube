<template>
	<div class="wrapper">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Wrapper',
};
</script>

<style scoped>
.wrapper {
	width: 100%;
	max-width: 40rem;
	margin: 0 auto;
}
</style>
