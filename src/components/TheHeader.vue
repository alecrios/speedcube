<template>
	<header class="header">
		<BaseWrapper>
			<div class="bar">
				<RouterLink to="/">
					<img src="../assets/logo.svg" alt="Logo">
				</RouterLink>

				<TheSessionSelect/>
			</div>
		</BaseWrapper>
	</header>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import TheSessionSelect from '@/components/TheSessionSelect.vue';

export default {
	name: 'TheHeader',
	components: {
		BaseWrapper,
		TheSessionSelect,
	},
};
</script>

<style scoped>
.header {
	background-color: var(--color-bg2);
	border-top: .125rem solid var(--color-bg2-lighter);
	border-bottom: .125rem solid var(--color-bg2-darker);
}

.bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 .75rem;
}

img {
	width: 8.625rem;
	height: 3.25rem;
}
</style>
