<template>
	<button
		:class="['button', type]"
		:aria-label="name"
		@click="$emit('click')"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: ['name', 'type'],
};
</script>

<style scoped>
.button {
	display: flex;
	align-items: center;
	padding-top: .4375rem;
	padding-bottom: .5625rem;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	color: var(--color-white);
	border-radius: .25rem;
	box-shadow: var(--box-shadow);
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	cursor: pointer;
}

.button:focus {
	box-shadow: var(--box-shadow-focus), var(--box-shadow);
}

.button:active {
	padding-top: .5rem;
	padding-bottom: .5rem;
	box-shadow: none;
}

.button.primary {
	background-color: var(--color-primary);
	border-top: .125rem solid var(--color-primary-lighter);
	border-bottom: .125rem solid var(--color-primary-darker);
}

.button.primary:active {
	border-top: .125rem solid var(--color-primary-darker);
	border-bottom: .125rem solid var(--color-primary-lighter);
}

.button.secondary {
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-lighter);
	border-bottom: .125rem solid var(--color-secondary-darker);
}

.button.secondary:active {
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
}

.button.danger {
	background-color: var(--color-danger);
	border-top: .125rem solid var(--color-danger-lighter);
	border-bottom: .125rem solid var(--color-danger-darker);
}

.button.danger:active {
	border-top: .125rem solid var(--color-danger-darker);
	border-bottom: .125rem solid var(--color-danger-lighter);
}
</style>
