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
.nav {
	background-color: var(--color-gray-6);
	border-bottom: .125rem solid var(--color-gray-9);
}

.links {
	display: flex;
	justify-content: center;
}

.link {
	position: relative;
	flex: 1 0 auto;
	text-align: center;
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	font-weight: 500;
	padding: .75rem 1.5rem;
	opacity: .5;
	color: var(--color-white);
}

.link::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -.125rem;
	width: 100%;
	height: .125rem;
	background-color: var(--color-gray-9);
}

.link.is-active {
	opacity: 1;
}

.link.is-active::after {
	background-color: var(--color-white);
}
</style>
