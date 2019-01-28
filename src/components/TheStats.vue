<template>
	<div class="stats">
		<div class="stat">
			<div class="label">Best</div>
			<div class="value">{{ best | formatTime }}</div>
		</div>
		<div class="stat">
			<div class="label">Worst</div>
			<div class="value">{{ worst | formatTime }}</div>
		</div>
		<div class="stat">
			<div class="label">Mean</div>
			<div class="value">{{ mean | formatTime }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TheStats',
	computed: {
		times() {
			return this.$store.state.solveIds
				.map((solveId) => this.$store.state.solves[solveId])
				.filter((solve) => !solve.dnf)
				.map((solve) => solve.time);
		},
		best() {
			return this.times.length ? Math.min(...this.times) : null;
		},
		worst() {
			return this.times.length ? Math.max(...this.times) : null;
		},
		mean() {
			return this.times.length
				? Math.floor(this.times.reduce((sum, time) => sum + time) / this.times.length)
				: null;
		},
	},
};
</script>

<style scoped>
.stats {
	display: flex;
	padding: 1.5rem;
}

.stat {
	flex: none;
	width: 33.3333%;
	text-align: center;
}

.label {
	font-size: .75rem;
	line-height: 1.5rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: .0625rem;
}

.value {
	font-size: 1.25rem;
	line-height: 1.5rem;
}
</style>
