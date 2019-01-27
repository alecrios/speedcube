<template>
	<header class="header">
		<BaseWrapper>
			<div class="bar">
				<RouterLink to="/">
					<img class="image" src="../assets/logo.svg" alt="Speedcube">
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
	background-color: var(--color-gray-5);
}

.bar {
	display: flex;
	justify-content: space-between;
	padding: .25rem;
}

.image {
	width: 9.125rem;
	height: 2.5rem;
}
</style>
