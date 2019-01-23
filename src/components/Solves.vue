<template>
	<table class="solves">
		<tr v-for="(solve, index) in solves" :key="index">
			<td>{{ solve.time | formatTime }}</td>
			<td>{{ solve.scramble | formatScramble }}</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: 'Solves',
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
};
</script>

<style scoped>

</style>
