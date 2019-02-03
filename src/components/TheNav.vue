<template>
	<nav class="nav">
		<BaseWrapper>
			<div class="links">
				<RouterLink class="link" to="/">Timer</RouterLink>
				<RouterLink class="link" to="/sessions">Sessions</RouterLink>
				<RouterLink class="link" to="/solves">Solves</RouterLink>
				<RouterLink class="link" to="/stats">Stats</RouterLink>
			</div>
		</BaseWrapper>
	</nav>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';

export default {
	name: 'TheNav',
	components: {
		BaseWrapper,
	},
};
</script>

<style scoped>
.nav {
	background-color: var(--color-bg2);
	border-top: .125rem solid var(--color-bg2-lighter);
	border-bottom: .125rem solid var(--color-bg2-darker);
}

.links {
	display: flex;
	justify-content: center;
}

.link {
	position: relative;
	flex: 1 0 auto;
	text-align: center;
	font-size: .75rem;
	line-height: 1rem;
	letter-spacing: .0625rem;
	text-transform: uppercase;
	font-weight: 500;
	padding: .75rem;
	color: var(--color-white);
}

.link::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: .125rem;
	transition: background-color 100ms ease;
	background-color: transparent;
}

.link:hover::after {
	background-color: var(--color-secondary);
}

.link.is-active::after {
	background-color: var(--color-primary);
}
</style>
