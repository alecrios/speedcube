<template>
	<div class="stats">
		<div class="stats__stat">
			<div class="stats__label">Best</div>
			<div class="stats__value">{{ best | formatTime }}</div>
		</div>
		<div class="stats__stat">
			<div class="stats__label">Worst</div>
			<div class="stats__value">{{ worst | formatTime }}</div>
		</div>
		<div class="stats__stat">
			<div class="stats__label">Mean</div>
			<div class="stats__value">{{ mean | formatTime }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Stats',
	computed: {
		times() {
			return this.$store.getters.solves.map((solve) => solve.time);
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

.stats__stat {
	flex: none;
	width: 33.3333%;
	text-align: center;
}

.stats__label {
	font-size: .75rem;
	line-height: 1.5rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: .0625rem;
}

.stats__value {
	font-size: 1.25rem;
	line-height: 1.5rem;
}
</style>
