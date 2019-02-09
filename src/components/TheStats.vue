<template>
	<div>
		<div
			class="set"
			v-for="(set, index) in sets"
			:key="index"
		>
			<div class="heading">{{ set.title }}</div>

			<div class="stats">
				<div class="stat best">
					<div class="label">Best</div>
					<div class="value">{{ getBestTime(set.limit) }}</div>
				</div>

				<div class="stat worst">
					<div class="label">Worst</div>
					<div class="value">{{ getWorstTime(set.limit) }}</div>
				</div>

				<div class="stat average">
					<div class="label">Average</div>
					<div class="value">{{ getAverageTime(set.limit) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import solveIdsOfCurrentSession from '@/mixins/solveIdsOfCurrentSession';

export default {
	name: 'TheStats',
	mixins: [solveIdsOfCurrentSession],
	data() {
		return {
			sets: [
				{
					title: 'Session',
					limit: null,
				},
				{
					title: 'Latest 5',
					limit: 5,
				},
				{
					title: 'Latest 12',
					limit: 12,
				},
			],
		};
	},
	computed: {
		times() {
			return this.$_solveIdsOfCurrentSession
				.map((solveId) => this.$store.state.solves[solveId])
				.map((solve) => (solve.dnf ? Infinity : solve.time));
		},
	},
	methods: {
		getLastNTimes(n) {
			return n === null ? this.times : this.times.slice(0, n);
		},
		getBestTime(n) {
			const times = this.getLastNTimes(n);

			const best = times.length < n ? null : Math.min(...times);

			return this.getFormattedTime(best);
		},
		getWorstTime(n) {
			const times = this.getLastNTimes(n);

			const worst = times.length < n ? null : Math.max(...times);

			return this.getFormattedTime(worst);
		},
		getAverageTime(n) {
			const times = this.getLastNTimes(n);
			let average;

			if (times.length < n) {
				average = null;
			} else if (times.includes(Infinity)) {
				average = Infinity;
			} else {
				average = times.reduce((sum, time) => sum + time, 0) / times.length;
			}

			return this.getFormattedTime(average);
		},
		getFormattedTime(time) {
			if (time === null) return '...';

			return time === Infinity ? 'DNF' : this.$options.filters.formatTime(time);
		},
	},
};
</script>

<style scoped>
.set {
	padding: 1.5rem;
}

.set + .set {
	border-top: .125rem solid var(--color-background-lighter);
}

.heading {
	font-size: 1.5rem;
	line-height: 1.5rem;
	color: var(--color-white);
	text-align: center;
	padding: 1.5rem 0;
}

.stats {
	display: flex;
	flex-wrap: wrap;
	padding: 1.5rem;
}

.stat {
	flex: none;
	width: 33.3333%;
	text-align: center;
}

.stat.best .value    {color: var(--color-cube-green)}
.stat.worst .value   {color: var(--color-cube-red)}
.stat.average .value {color: var(--color-cube-blue)}

.label {
	font-size: .75rem;
	line-height: 1.5rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	color: var(--color-white);
}

.value {
	font-size: 1.5rem;
	line-height: 2.25rem;
	color: var(--color-white);
}
</style>
