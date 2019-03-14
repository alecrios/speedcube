<template>
	<nav class="nav">
		<BaseWrapper>
			<div class="links">
				<RouterLink class="link" to="/">{{ $t('timer') }}</RouterLink>
				<RouterLink class="link" to="/sessions">{{ $t('sessions') }}</RouterLink>
				<RouterLink class="link" to="/solves">{{ $t('solves') }}</RouterLink>
				<RouterLink class="link" to="/stats">{{ $t('stats') }}</RouterLink>
			</div>
		</BaseWrapper>
	</nav>
</template>

<script>
export default {
	name: 'TheNav',
};
</script>

<style scoped>
.nav {
	background-color: var(--color-charcoal);
	border-top: .125rem solid var(--color-charcoal-lighter);
	border-bottom: .125rem solid var(--color-charcoal-darker);
}

.links {
	display: flex;
	overflow-x: auto;
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
