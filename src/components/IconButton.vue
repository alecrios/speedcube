<template>
	<button
		:class="['icon-button', {'is-active': isActive}, icon]"
		:aria-label="name"
		:title="name"
		:disabled="disabled"
		@click="$emit('click')"
	/>
</template>

<script>
export default {
	name: 'IconButton',
	props: ['name', 'icon', 'is-active', 'disabled'],
};
</script>

<style scoped>
.icon-button {
	width: 1.5rem;
	height: 1.5rem;
	background-size: 1.5rem 1.5rem;
	background-position: center center;
	background-repeat: no-repeat;
	vertical-align: middle;
	cursor: pointer;
	transition: opacity 100ms ease;
	opacity: .25;
}

.icon-button.penalty {
	background-image: url('../assets/icon-penalty.svg');
}

.icon-button.remove {
	background-image: url('../assets/icon-remove.svg');
}

.icon-button.rename {
	background-image: url('../assets/icon-rename.svg');
}

.icon-button:hover {
	opacity: 1;
}

.icon-button.is-active {
	opacity: 1;
}

.icon-button:disabled {
	opacity: .1;
	cursor: not-allowed;
}
</style>
