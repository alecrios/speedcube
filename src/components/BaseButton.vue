<template>
	<button
		:class="['button', type, {'has-icon': hasIcon}, icon]"
		:aria-label="name"
		@click="$emit('click')"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: ['name', 'type', 'has-icon', 'icon'],
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
	transition: background-color 100ms ease;
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

/* .button.has-icon {
	padding: .25rem .75rem .25rem .5rem;
}

.button.has-icon::before {
	content: '';
	width: 1rem;
	height: 1rem;
	background-size: 1rem 1rem;
	background-position: center center;
	background-repeat: no-repeat;
	margin-right: .25rem;
}

.button.has-icon.add::before {
	background-image: url('../assets/icon-add.svg');
}

.button.has-icon.remove::before {
	background-image: url('../assets/icon-remove.svg');
} */
</style>
