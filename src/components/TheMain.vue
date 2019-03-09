<template>
	<main class="main">
		<BaseWrapper>
			<RouterView id="content"/>
		</BaseWrapper>
	</main>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';

export default {
	name: 'TheMain',
	components: {
		BaseWrapper,
	},
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
