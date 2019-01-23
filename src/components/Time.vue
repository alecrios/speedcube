<template>
	<div class="time"
		@mousedown="mousedownHandler()"
		@mouseup="mouseupHandler()"
		@touchstart.prevent="touchstartHandler()"
		@touchend.prevent="touchendHandler()"
	>
		<div class="time__display" :data-status="status">
			{{ status === 'complete' ? previousTime : duration | formatTime }}
		</div>
	</div>
</template>

<script>
import eventBus from '../eventBus';

export default {
	name: 'Time',
	props: ['time'],
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
		duration() {
			if (!this.currentTime || !this.startTime) return 0;

			return this.currentTime - this.startTime;
		},
	},
	methods: {
		startPreparation() {
			this.status = 'pending';
			this.preparationTimer = setTimeout(this.finishPreparation, 500);
		},
		cancelPreparation() {
			this.status = 'idle';
			clearTimeout(this.preparationTimer);
		},
		finishPreparation() {
			this.status = 'ready';
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
			eventBus.emit('timer-ended', this.duration);
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
		touchstartHandler() {
			this.pressTimer();
		},
		touchendHandler() {
			this.releaseTimer();
		},
		keydownHandler(event) {
			if (event.key !== ' ' || event.repeat) return;

			this.pressTimer();
		},
		keyupHandler(event) {
			if (event.key !== ' ') return;

			this.releaseTimer();
		},
	},
	created() {
		eventBus.listen('reset', this.resetTimer);
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
.time {
	padding: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	-webkit-tap-highlight-color: transparent;
	cursor: pointer;
	user-select: none;
}

.time__display {
	color: var(--color-white);
	font-size: 4rem;
	line-height: 4.5rem;
	font-weight: 300;
}

.time__display[data-status="idle"] {color: var(--color-white)}
.time__display[data-status="pending"] {color: var(--color-red)}
.time__display[data-status="ready"] {color: var(--color-green)}
.time__display[data-status="running"] {color: var(--color-white)}
.time__display[data-status="complete"] {color: var(--color-white)}
</style>
