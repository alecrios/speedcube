<template>
	<nav class="nav">
		<Wrapper>
			<div class="links">
				<RouterLink class="link timer" to="/">Timer</RouterLink>
				<RouterLink class="link solves" to="/solves">Solves</RouterLink>
				<RouterLink class="link stats" to="/stats">Stats</RouterLink>
			</div>
		</Wrapper>
	</nav>
</template>

<script>
import Wrapper from '@/components/Wrapper.vue';

export default {
	name: 'NavBar',
	components: {
		Wrapper,
	},
};
</script>

<style scoped>
.links {
	display: flex;
	justify-content: center;
	padding: .75rem 1.5rem;
}

.link {
	flex: 1 0 auto;
	text-align: center;
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	font-weight: 500;
	padding: .75rem 1.5rem;
}

.link.is-active {
	border-bottom: .125rem solid var(--color-white);
}
</style>
