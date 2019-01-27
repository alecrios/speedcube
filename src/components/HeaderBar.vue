<template>
	<header class="header">
		<Wrapper>
			<div class="bar">
				<RouterLink to="/">
					<img class="image" src="../assets/logo.svg" alt="Speedcube">
				</RouterLink>
			</div>
		</Wrapper>
	</header>
</template>

<script>
import Wrapper from '@/components/Wrapper.vue';

export default {
	name: 'HeaderBar',
	components: {
		Wrapper,
	},
};
</script>

<style scoped>
.header {
	background-color: var(--color-gray-5);
}

.bar {
	display: flex;
	justify-content: center;
	padding: .25rem;
}

.image {
	width: 9.125rem;
	height: 2.5rem;
}
</style>
