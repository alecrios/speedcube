<template>
	<button
		:class="['button', icon]"
		:aria-label="name"
		@click="$emit('click')"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: ['name', 'icon'],
};
</script>

<style scoped>
.button {
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: background-color 100ms ease;
	background-color: var(--color-gray-5);
	font-size: .75rem;
	line-height: 1.5rem;
	font-weight: 400;
	letter-spacing: .03125rem;
	color: var(--color-white);
	padding: .25rem .75rem .25rem .5rem;
	border-radius: .25rem;
}

.button::before {
	content: '';
	width: 1rem;
	height: 1rem;
	background-size: 1rem 1rem;
	background-position: center center;
	background-repeat: no-repeat;
	margin-right: .25rem;
}

.button.add::before {
	background-image: url('../assets/icon-add.svg');
}

.button.remove::before {
	background-image: url('../assets/icon-remove.svg');
}

.button:hover {
	background-color: var(--color-gray-7);
}

</style>
