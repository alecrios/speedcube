<template>
	<button
		ref="display"
		:class="['display', {'hidden-while-solving': hideClockWhileSolving}]"
		:data-status="timerStatus"
		@mousedown="mousedownHandler"
		@mouseup="mouseupHandler"
		@mouseleave="mouseleaveHandler"
		@touchstart.prevent="touchstartHandler"
		@touchend.prevent="touchendHandler"
		@touchmove.prevent="touchmoveHandler"
	>
		{{ displayText }}
	</button>
</template>

<script>
import inert from '@/mixins/inert';

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
		};
	},
	computed: {
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
		displayText() {
			if (this.timerStatus === 'running') {
				return this.hideClockWhileSolving ? this.solvingText : this.formatTime(this.duration);
			}

			if (this.timerStatus === 'complete') {
				const previousSolve = this.$store.state.solves[this.previousSolveId];
				const time = this.formatTime(previousSolve.time);
				return previousSolve.dnf ? 'DNF' : `${time}${previousSolve.p2 ? '+' : ''}`;
			}

			return this.formatTime(this.duration);
		},
	},
	methods: {
		formatTime(time) {
			return this.$options.filters.formatTime(time);
		},
		startPreparation() {
			this.$emit('timer-status-update', 'pending');
			this.preparationTimer = setTimeout(this.finishPreparation, 250);
		},
		cancelPreparation() {
			this.$emit('timer-status-update', 'idle');
			clearTimeout(this.preparationTimer);
		},
		finishPreparation() {
			this.$emit('timer-status-update', 'ready');
			clearTimeout(this.preparationTimer);
		},
		startTimer() {
			this.startTime = Date.now();
			this.timerInterval = setInterval(this.updateTimer, 10);
			this.$emit('timer-status-update', 'running');
		},
		updateTimer() {
			this.currentTime = Date.now();
		},
		stopTimer() {
			clearInterval(this.timerInterval);
			this.$emit('timer-status-update', 'complete');
			this.$emit('new-time', this.duration);
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

			if (this.timerStatus === 'idle' || this.timerStatus === 'complete') {
				this.startPreparation();
			} else if (this.timerStatus === 'running') {
				this.stopTimer();
			}
		},
		releaseTimer() {
			if (this.timerStatus === 'pending') {
				this.cancelPreparation();
				return;
			}

			if (this.timerStatus !== 'ready') return;

			this.startTimer();
		},
		mousedownHandler() {
			this.pressTimer();
		},
		mouseupHandler() {
			this.releaseTimer();
		},
		mouseleaveHandler() {
			if (this.timerStatus !== 'pending' && this.timerStatus !== 'ready') return;

			// The user dragged the mouse off of the display, cancel preparation
			this.cancelPreparation();
		},
		touchstartHandler() {
			this.pressTimer();
		},
		touchendHandler() {
			this.releaseTimer();
		},
		touchmoveHandler(event) {
			if (this.timerStatus !== 'pending' && this.timerStatus !== 'ready') return;

			// Get the user's touch so we can essentially polyfill a 'touchleave' event
			const touch = event.touches[0];

			// If the user is still touching the display, do nothing
			if (document.elementFromPoint(touch.pageX, touch.pageY) === this.$refs.display) return;

			// The user is not touching the display anymore, cancel preparation
			this.cancelPreparation();
		},
		keydownHandler(event) {
			// Only continue if this is not inert
			if (this.$_isInert(this.$refs.display)) return;

			// Only continue if this is a non-repeated keydown of the space key
			if (event.key !== ' ' || event.repeat) return;

			this.$refs.display.focus();
			this.pressTimer();
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

.display[data-status='pending'] {color: var(--color-cube-red)}
.display[data-status='ready']   {color: var(--color-cube-green)}

.display.hidden-while-solving[data-status='running'] {
	font-size: 3rem;
}

.display:focus {
	box-shadow: none;
}
</style>
