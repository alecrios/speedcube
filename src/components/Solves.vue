<template>
	<table class="solves">
		<tbody>
			<tr v-for="(solve, index) in solves" :key="index" class="solves__row">
				<td class="solves__cell">{{ solve.time | formatTime }}</td>
				<td class="solves__cell">{{ solve.scramble | formatScramble }}</td>
				<td class="solves__cell">{{ relativeTime(solve.timestamp) }}</td>
				<td class="solves__cell">
					<button
						:class="[
							'solves__penalty-toggle',
							{'solves__penalty-toggle--is-active': solve.plusTwo},
						]"
						@click="togglePlusTwo(index)"
					>
						+2
					</button>
				</td>
				<td class="solves__cell">
					<button
						:class="[
							'solves__penalty-toggle',
							{'solves__penalty-toggle--is-active': solve.dnf},
						]"
						@click="toggleDnf(index)"
					>
						DNF
					</button>
				</td>
				<td class="solves__cell">
					<button
						class="solves__remove-button"
						@click="removeSolve(index)"
					>
						X
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import moment from 'moment';

export default {
	name: 'Solves',
	data() {
		return {
			now: Date.now(),
		};
	},
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
	methods: {
		updateNow() {
			this.now = Date.now();
		},
		relativeTime(timestamp) {
			return moment(timestamp).from(this.now);
		},
		removeSolve(index) {
			this.$store.commit('removeSolve', index);
		},
		togglePlusTwo(index) {
			this.$store.commit('togglePlusTwo', index);
		},
		toggleDnf(index) {
			this.$store.commit('toggleDnf', index);
		},
	},
	mounted() {
		setInterval(this.updateNow, 30000);
	},
	beforeDestroy() {
		clearInterval(this.updateNow);
	},
};
</script>

<style scoped>
.solves__cell {
	padding: .5rem .75rem;
}

.solves__remove-button {
	color: var(--color-white);
}

.solves__penalty-toggle {
	color: var(--color-white);
}

.solves__penalty-toggle--is-active {
	color: var(--color-red);
}
</style>
