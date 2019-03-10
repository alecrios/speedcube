<template>
	<transition name="prompt">
		<div class="update-prompt">
			{{ $t('updateAvailable') }}
			<button class="reload-button" @click="$emit('reload')">{{ $t('reload') }}</button>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'TheUpdatePrompt',
};
</script>

<style scoped>
.update-prompt {
	position: fixed;
	bottom: 1.5rem;
	right: 1.5rem;
	max-width: 20rem;
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-lighter);
	border-bottom: .125rem solid var(--color-secondary-darker);
	border-radius: .25rem;
	padding: .75rem 1.25rem;
	box-shadow: var(--box-shadow-medium);
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: var(--color-white);
	transition: transform 250ms ease;
}

.prompt-enter,
.prompt-leave-active {
	opacity: 0;
}

.prompt-enter .update-prompt,
.prompt-leave-active .update-prompt {
	transform: translateY(-1.5rem);
}

.reload-button {
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: var(--color-cube-blue);
	text-shadow: var(--text-shadow);
	text-decoration: underline;
	cursor: pointer;
}
</style>
