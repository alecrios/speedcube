<template>
	<button
		ref="display"
		:class="['display', {'hidden-while-solving': hideClockWhileSolving}]"
		:data-status="timerStatus"
		@mousedown="pressTimer"
		@mouseup="releaseTimer"
		@mouseleave="leaveTimer"
		@touchstart.prevent="pressTimer"
		@touchend.prevent="releaseTimer"
		@touchmove.prevent="leaveTimer"
	>
		{{ displayText }}
	</button>
</template>

<script>
import inert from '@/mixins/inert';

import formatTime from '@/utils/formatTime';

import AudioCues from '@/lib/audioCues';

const audioCues = new AudioCues();

/**
 * Timer Status Lifecycle
 *
 * idle
 * ready-to-inspect (if inspection enabled)
 * inspecting (if inspection enabled)
 * pending
 * ready
 * solving
 * complete
 */

export default {
	name: 'TimerClock',
	mixins: [inert],
	props: ['timer-status', 'scramble-status', 'solve-id', 'previous-solve-id'],
	data() {
		return {
			startTime: null,
			currentTime: null,
			preparationTimer: null,
			timerInterval: null,
			inspectionTimeElapsed: 0,
			inspectionTimerInterval: null,
		};
	},
	computed: {
		enableInspection() {
			return this.$store.state.settings.enableInspection;
		},
		enableInspectionAudio() {
			return this.$store.state.settings.enableInspectionAudio;
		},
		hideClockWhileSolving() {
			return this.$store.state.settings.hideClockWhileSolving;
		},
		solvingText() {
			return this.$t('solving');
		},
		duration() {
			if (!this.currentTime || !this.startTime) return 0;

			return this.currentTime - this.startTime;
		},
		inspectionTime() {
			return `${(15000 - this.inspectionTimeElapsed) / 1000}`;
		},
		displayText() {
			let text;

			if (this.timerStatus === 'inspecting') {
				// Display the inspection timer
				text = this.inspectionTime;
			} else if (this.timerStatus === 'solving') {
				// Display the solve timer (or the solving text when applicable)
				text = this.hideClockWhileSolving ? this.solvingText : formatTime(this.duration);
			} else if (this.timerStatus === 'complete') {
				// Display the time of the previous solve
				const previousSolve = this.$store.state.solves[this.previousSolveId];
				text = formatTime(previousSolve);
			} else {
				// Display either the inspection timer or the solve timer
				text = this.enableInspection ? this.inspectionTime : formatTime(this.duration);
			}

			return text;
		},
	},
	methods: {
		markReadyToInspect() {
			this.$emit('timer-status-update', 'ready-to-inspect');
		},
		startInspectionTimer() {
			this.inspectionTimerInterval = setInterval(this.updateInspectionTimer, 1000);
			this.$emit('timer-status-update', 'inspecting');
		},
		updateInspectionTimer() {
			this.inspectionTimeElapsed += 1000;

			if (this.inspectionTimeElapsed === 8000) {
				audioCues.play('8-seconds');
			} else if (this.inspectionTimeElapsed === 12000) {
				audioCues.play('12-seconds');
			} else if (this.inspectionTimeElapsed === 15000) {
				this.$emit('solve-status-update', '+2');
			} else if (this.inspectionTimeElapsed === 17000) {
				this.$emit('solve-status-update', 'DNF');
			}
		},
		cancelInspectionPreparation() {
			this.$emit('timer-status-update', 'idle');
		},
		stopInspectionTimer() {
			clearInterval(this.inspectionTimerInterval);
			this.inspectionTimerInterval = null;
			this.inspectionTimeElapsed = 0;
		},
		startPreparation() {
			this.$emit('timer-status-update', 'pending');
			this.preparationTimer = setTimeout(this.finishPreparation, 250);
		},
		cancelPreparation() {
			this.$emit('timer-status-update', this.enableInspection ? 'inspecting' : 'idle');
			clearTimeout(this.preparationTimer);
			this.preparationTimer = null;
		},
		finishPreparation() {
			this.$emit('timer-status-update', 'ready');
			clearTimeout(this.preparationTimer);
			this.preparationTimer = null;
		},
		startTimer() {
			this.startTime = Date.now();
			this.timerInterval = setInterval(this.updateTimer, 10);
			this.$emit('timer-status-update', 'solving');
		},
		updateTimer() {
			this.currentTime = Date.now();
		},
		stopSolveTimer() {
			clearInterval(this.timerInterval);
			this.timerInterval = null;
		},
		finishSolve() {
			this.stopSolveTimer();
			this.$emit('timer-status-update', 'complete');
			this.$emit('solve-completed', this.duration);
		},
		resetTimer() {
			this.startTime = null;
			this.currentTime = null;
		},
		pressTimer() {
			if (
				this.scrambleStatus === 'loading'
				|| this.timerStatus === 'pending'
				|| this.timerStatus === 'ready'
			) {
				return;
			}

			if (this.timerStatus === 'solving') {
				this.finishSolve();
				return;
			}

			if (this.enableInspection && this.timerStatus !== 'inspecting') {
				this.markReadyToInspect();
				return;
			}

			this.startPreparation();
		},
		releaseTimer() {
			if (this.timerStatus === 'ready-to-inspect') {
				this.startInspectionTimer();
			} else if (this.timerStatus === 'pending') {
				this.cancelPreparation();
			} else if (this.timerStatus === 'ready') {
				if (this.enableInspection) {
					this.stopInspectionTimer();
				}

				this.startTimer();
			}
		},
		cancel() {
			if (this.timerStatus === 'inspecting') {
				this.stopInspectionTimer();
				this.$emit('timer-status-update', 'idle');
			} else if (this.timerStatus === 'solving') {
				this.stopSolveTimer();
				this.resetTimer();
				this.$emit('timer-status-update', 'idle');
			}
		},
		leaveTimer(event) {
			// Only continue if the user is currently holding down the button
			if (
				this.timerStatus !== 'ready-to-inspect'
				&& this.timerStatus !== 'pending'
				&& this.timerStatus !== 'ready'
			) {
				return;
			}

			if (event.type === 'touchmove') {
				// Get the user's touch so we can essentially polyfill a 'touchleave' event
				const touch = event.touches[0];

				// If the user is still touching the display, do nothing
				if (document.elementFromPoint(touch.pageX, touch.pageY) === this.$refs.display) {
					return;
				}
			}

			if (this.timerStatus === 'pending' || this.timerStatus === 'ready') {
				this.cancelPreparation();
			} else if (this.timerStatus === 'ready-to-inspect') {
				this.cancelInspectionPreparation();
			}
		},
		keydownHandler(event) {
			// Only continue if this is not inert
			if (this.$_isInert(this.$refs.display)) return;

			// Only continue if this is a non-repeated keydown
			if (event.repeat) return;

			if (event.key === ' ') {
				this.$refs.display.focus();
				this.pressTimer();
			} else if (event.key === 'Escape') {
				this.cancel();
			}
		},
		keyupHandler(event) {
			// Only continue if this is a keydown of the space key
			if (event.key !== ' ') return;

			this.releaseTimer();
		},
	},
	watch: {
		solveId() {
			this.resetTimer();
		},
	},
	mounted() {
		document.addEventListener('keydown', this.keydownHandler);
		document.addEventListener('keyup', this.keyupHandler);
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.keydownHandler);
		document.removeEventListener('keyup', this.keyupHandler);
	},
};
</script>

<style scoped>
.display {
	width: 100%;
	padding: 4.5rem 1.5rem;
	font-size: 4.5rem;
	line-height: 4rem;
	font-weight: 300;
	color: var(--color-cube-white);
	-webkit-tap-highlight-color: transparent;
	cursor: pointer;
	user-select: none;
}

.display[data-status='idle'] {color: var(--color-cube-white)}
.display[data-status='ready-to-inspect'] {color: var(--color-cube-green)}
.display[data-status='inspecting'] {color: var(--color-cube-yellow)}
.display[data-status='pending'] {color: var(--color-cube-red)}
.display[data-status='ready'] {color: var(--color-cube-green)}
.display[data-status='solving'] {color: var(--color-cube-white)}
.display[data-status='complete'] {color: var(--color-cube-white)}

.display.hidden-while-solving[data-status='solving'] {
	font-size: 3rem;
}

.display:focus {
	box-shadow: none;
}
</style>
