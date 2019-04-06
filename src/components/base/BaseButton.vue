<template>
	<button
		:class="['button', size, type]"
		:aria-label="name"
		@click="$emit('click')"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: ['name', 'size', 'type'],
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
	box-shadow: var(--box-shadow-small);
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	cursor: pointer;
}

.button.small {
	font-size: .75rem;
	line-height: 1.25rem;
	font-weight: 500;
	padding-top: .1875rem;
	padding-bottom: .3125rem;
	padding-left: .75rem;
	padding-right: .75rem;
}

.button:active {
	padding-top: .5rem;
	padding-bottom: .5rem;
	box-shadow: none;
}

.button.small:active {
	padding-top: .25rem;
	padding-bottom: .25rem;
}

.button:focus {
	box-shadow: var(--box-shadow-focus), var(--box-shadow-small);
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
