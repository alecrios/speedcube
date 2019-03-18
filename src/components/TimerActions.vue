<template>
	<div class="actions" ref="actions">
		<IconPenalizeSolve
			:solve-id="solveId"
			:disabled="timerStatus !== 'complete'"
		/>

		<IconDeleteSolve
			:solve-id="solveId"
			:disabled="timerStatus !== 'complete'"
			@deleted="$emit('deleted')"
		/>

		<IconTimerSettings/>
		<IconFullscreen/>
	</div>
</template>

<script>
import IconPenalizeSolve from '@/components/IconPenalizeSolve.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import IconTimerSettings from '@/components/IconTimerSettings.vue';
import IconFullscreen from '@/components/IconFullscreen.vue';

import inert from '@/mixins/inert';

export default {
	name: 'TimerActions',
	mixins: [inert],
	components: {
		IconPenalizeSolve,
		IconDeleteSolve,
		IconTimerSettings,
		IconFullscreen,
	},
	props: ['timer-status', 'solve-id'],
	methods: {
		keydownHandler(event) {
			// Only continue if this is not inert
			if (this.$_isInert(this.$refs.actions)) return;

			switch (event.key) {
			case 'f':
				this.toggleFullscreen();
				break;
			case 'x':
				this.deleteSolve();
				break;
			case '2':
				this.toggleP2();
				break;
			case 'd':
				this.toggleDnf();
				break;
			default:
				break;
			}
		},
		toggleFullscreen() {
			this.$store.commit('setFullscreen', !this.$store.state.settings.isFullscreen);
		},
		deleteSolve() {
			if (this.timerStatus !== 'complete') return;

			this.$store.commit('removeSolve', this.solveId);
			this.$emit('deleted');
		},
		toggleP2() {
			if (this.timerStatus !== 'complete') return;

			this.$store.commit('setSolveP2', {
				id: this.solveId,
				value: !this.$store.state.solves[this.solveId].p2,
			});
		},
		toggleDnf() {
			if (this.timerStatus !== 'complete') return;

			this.$store.commit('setSolveDnf', {
				id: this.solveId,
				value: !this.$store.state.solves[this.solveId].dnf,
			});
		},
	},
	mounted() {
		document.addEventListener('keydown', this.keydownHandler);
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.keydownHandler);
	},
};
</script>

<style scoped>
.actions {
	padding: 0 1.5rem;
	display: flex;
	justify-content: center;
}

.actions > * + * {
	margin-left: .75rem;
}
</style>
