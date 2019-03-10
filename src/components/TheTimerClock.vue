<template>
	<button
		ref="display"
		:class="['display', {'hidden-while-solving': hideClockWhileSolving}]"
		:data-status="status"
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
export default {
	name: 'TheTimerClock',
	props: ['solve-id'],
	data() {
		return {
			status: 'idle',
			startTime: null,
			currentTime: null,
			previousTime: null,
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
			switch (this.status) {
			case 'running':
				return this.hideClockWhileSolving ? this.solvingText : this.formatTime(this.duration);
			case 'complete':
				return this.formatTime(this.previousTime);
			default:
				return this.formatTime(this.duration);
			}
		},
	},
	methods: {
		formatTime(time) {
			return this.$options.filters.formatTime(time);
		},
		startPreparation() {
			this.status = 'pending';
			this.preparationTimer = setTimeout(this.finishPreparation, 250);
		},
		cancelPreparation() {
			this.status = 'idle';
			clearTimeout(this.preparationTimer);
		},
		finishPreparation() {
			this.status = 'ready';
			clearTimeout(this.preparationTimer);
		},
		startTimer() {
			this.startTime = Date.now();
			this.timerInterval = setInterval(this.updateTimer, 10);
			this.status = 'running';
		},
		updateTimer() {
			this.currentTime = Date.now();
		},
		stopTimer() {
			clearInterval(this.timerInterval);
			this.status = 'complete';
			this.$emit('new-time', this.duration);
		},
		resetTimer() {
			this.previousTime = this.duration;
			this.startTime = null;
			this.currentTime = null;
		},
		pressTimer() {
			if (this.status === 'pending' || this.status === 'ready') return;

			if (this.status === 'idle' || this.status === 'complete') {
				this.startPreparation();
			} else if (this.status === 'running') {
				this.stopTimer();
			}
		},
		releaseTimer() {
			if (this.status === 'pending') {
				this.cancelPreparation();
				return;
			}

			if (this.status !== 'ready') return;

			this.startTimer();
		},
		mousedownHandler() {
			this.pressTimer();
		},
		mouseupHandler() {
			this.releaseTimer();
		},
		mouseleaveHandler() {
			if (this.status !== 'pending' && this.status !== 'ready') return;

			this.cancelPreparation();
		},
		touchstartHandler() {
			this.pressTimer();
		},
		touchendHandler() {
			this.releaseTimer();
		},
		touchmoveHandler(event) {
			if (this.status !== 'pending' && this.status !== 'ready') return;

			const touch = event.touches[0];

			if (document.elementFromPoint(touch.pageX, touch.pageY) === this.$refs.display) return;

			this.cancelPreparation();
		},
		keydownHandler(event) {
			if (event.key !== ' ' || event.repeat) return;

			this.$refs.display.focus();
			this.pressTimer();
		},
		keyupHandler(event) {
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
	padding: 3rem;
	font-size: 4.5rem;
	line-height: 4rem;
	font-weight: 300;
	-webkit-tap-highlight-color: transparent;
	cursor: pointer;
	user-select: none;
}

.display[data-status='idle']     {color: var(--color-cube-white)}
.display[data-status='pending']  {color: var(--color-cube-red)}
.display[data-status='ready']    {color: var(--color-cube-green)}
.display[data-status='running']  {color: var(--color-cube-white)}
.display[data-status='complete'] {color: var(--color-cube-white)}

.display.hidden-while-solving[data-status='running'] {
	font-size: 3rem;
}

.display:focus {
	box-shadow: none;
}
</style>
