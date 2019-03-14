<template>
	<main class="main">
		<BaseWrapper>
			<RouterView/>
		</BaseWrapper>
	</main>
</template>

<script>
export default {
	name: 'TheMain',
};
</script>

<style scoped>
.main {
	flex: 1 0 auto;
	padding: 1.5rem 0;
	background-color: var(--color-slate);
	border-top: .125rem solid var(--color-slate-lighter);
	border-bottom: .125rem solid var(--color-slate-darker);
}
</style>
