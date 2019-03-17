<template>
	<div class="scramble-display">
		<div class="container">
			<div class="loading-indicator" v-if="scrambleStatus === 'loading'"></div>
			<ScrambleString :scramble="scramble" v-if="scrambleStatus !== 'loading'"/>
		</div>
	</div>
</template>

<script>
import ScrambleString from '@/components/ScrambleString.vue';

import ScrambleWorker from '@/scramble.worker';

const scrambleWorker = new ScrambleWorker();

export default {
	name: 'TheTimerScramble',
	props: ['scramble-status', 'scramble', 'solve-id'],
	components: {
		ScrambleString,
	},
	data() {
		return {
			scramblesToKeepOnReserve: 5,
			scramblesPending: 0,
		};
	},
	computed: {
		// The current puzzle type
		cubeSize() {
			return this.$store.state.sessions[this.$store.state.currentSession].cubeSize;
		},
		// The store of pregenerated scrambles for the current puzzle type
		scrambles() {
			return this.$store.state.scrambles[this.cubeSize];
		},
	},
	methods: {
		// Ensure there are scrambles on reserve for safety
		ensureEnoughScramblesOnReserve() {
			// The number of scrambles required to meet the desired length
			const requiredScrambles = this.scramblesToKeepOnReserve
				- (this.scrambles.length + this.scramblesPending);

			// Only continue if there are not enough scrambles on reserve
			if (requiredScrambles <= 0) return;

			// Request the scrambles from the worker
			for (let i = 0; i < requiredScrambles; i += 1) {
				this.requestScrambleFromWorker();
			}
		},
		// Send a message to the worker requesting a new scramble
		requestScrambleFromWorker() {
			this.scramblesPending += 1;
			scrambleWorker.postMessage(this.cubeSize);
		},
		// Receive a message from the worker containing a new scramble
		receiveScrambleFromWorker(scramble) {
			this.scramblesPending -= 1;

			// Add the new scramble to the store
			this.$store.commit('pushScramble', {cubeSize: this.cubeSize, scramble: scramble.data});

			// Only continue if the timer has been waiting for a scramble
			if (this.scrambleStatus !== 'loading') return;

			// Use this scramble immediately and unset the loading status
			this.useScramble();
			this.$emit('scramble-status-update', 'ready');
		},
		// Use the scramble
		useScramble() {
			// Get a scramble from the store
			const scramble = this.scrambles[this.scrambles.length - 1];

			// Send the scramble to the timer
			this.$emit('new-scramble', scramble);

			// Remove the scramble from the store
			this.$store.commit('popScramble', this.cubeSize);

			// Top off the the scramble reserve
			this.ensureEnoughScramblesOnReserve();
		},
	},
	watch: {
		// Whenever there is a new solve, get a new scramble
		solveId: {
			immediate: true,
			handler() {
				// If there is no scramble available, set the status to loading
				if (!this.scrambles.length) {
					this.$emit('scramble-status-update', 'loading');
					return;
				}

				// If there is a scramble available, use it
				this.useScramble();
			},
		},
	},
	created() {
		// Add listener for incoming scrambles from the worker
		scrambleWorker.addEventListener('message', this.receiveScrambleFromWorker);

		// Make sure the reserve is full
		this.ensureEnoughScramblesOnReserve();
	},
	beforeDestroy() {
		// Remove listener for incoming scrambles from the worker
		scrambleWorker.removeEventListener('message', this.receiveScrambleFromWorker);
	},
};
</script>

<style scoped>
.scramble-display {
	padding: 0 1.5rem;
}

.container {
	max-width: 22rem;
	margin: 0 auto;
	text-align: center;
	font-size: 1.5rem;
	line-height: 2.25rem;
}

.loading-indicator {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .75rem;
}

.loading-indicator::before {
	content: '';
	width: 3rem;
	height: 3rem;
	border: .125rem solid var(--color-primary);
	border-top-color: transparent;
	border-radius: 50%;
	animation: spin 500ms linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg) }
	100% { transform: rotate(360deg) }
}
</style>
