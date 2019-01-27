<template>
	<div>
		<button
			class="remove-all"
			@click="removeAllSolves()"
		>
			Clear
		</button>
	</div>
</template>

<script>
export default {
	name: 'TheSolvesGlobalActions',
	methods: {
		removeAllSolves() {
			this.$store.commit('removeAllSolves');
		},
	},
};
</script>

<style scoped>
.remove-all {
	font-size: .75rem;
	font-weight: 500;
	line-height: 1.5rem;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	color: var(--color-gray-9);
	padding: .75rem;
	cursor: pointer;
}

.remove-all:hover {
	color: var(--color-white);
}
</style>
