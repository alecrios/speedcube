<template>
	<div class="actions" ref="actions">
		<IconChangeSolveStatus
			:solve-id="solveId"
			:disabled="timerStatus !== 'complete'"
		/>

		<IconDeleteSolve
			:solve-id="solveId"
			:disabled="timerStatus !== 'complete'"
			@deleted="$emit('deleted')"
		/>

		<IconTimerSettings
			:disabled="!['loading', 'idle', 'complete'].includes(timerStatus)"
		/>

		<IconFullscreen/>

		<IconTimerHelp/>
	</div>
</template>

<script>
import IconChangeSolveStatus from '@/components/IconChangeSolveStatus.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import IconTimerSettings from '@/components/IconTimerSettings.vue';
import IconFullscreen from '@/components/IconFullscreen.vue';
import IconTimerHelp from '@/components/IconTimerHelp.vue';

import inert from '@/mixins/inert';

export default {
	name: 'TimerActions',
	mixins: [inert],
	components: {
		IconChangeSolveStatus,
		IconDeleteSolve,
		IconTimerSettings,
		IconFullscreen,
		IconTimerHelp,
	},
	props: ['timer-status', 'solve-id'],
	methods: {
		keydownHandler(event) {
			// Only continue if this is not inert
			if (this.$_isInert(this.$refs.actions)) return;

			switch (event.key) {
			case '1':
				this.setSolveStatus('OK');
				break;
			case '2':
				this.setSolveStatus('+2');
				break;
			case '3':
				this.setSolveStatus('DNF');
				break;
			case 'x':
				this.deleteSolve();
				break;
			case 'f':
				this.toggleFullscreen();
				break;
			default:
				break;
			}
		},
		setSolveStatus(status) {
			if (this.timerStatus !== 'complete') return;

			this.$store.commit('setSolveStatus', {id: this.solveId, status});
		},
		deleteSolve() {
			if (this.timerStatus !== 'complete') return;

			this.$store.commit('removeSolve', this.solveId);
			this.$emit('deleted');
		},
		toggleFullscreen() {
			this.$store.commit('setFullscreen', !this.$store.state.settings.isFullscreen);
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
	margin-left: 1.125rem;
}
</style>
