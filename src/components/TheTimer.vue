<template>
	<div class="timer" ref="timer">
		<TheTimerScramble
			:solve-id="solveId"
			:scramble="solve.scramble"
			@new-scramble="(scramble) => { this.solve.scramble = scramble; }"
		/>

		<TheTimerClock
			:previous-solve-id="previousSolveId"
			:solve-id="solveId"
			:status="status"
			@status-update="(status) => { this.status = status; }"
			@new-time="addSolve"
		/>

		<div class="actions">
			<IconPenalizeSolve
				:solve-id="previousSolveId"
				:disabled="status !== 'complete'"
			/>

			<IconDeleteSolve
				:solve-id="previousSolveId"
				:disabled="status !== 'complete'"
				@deleted="onDeleted"
			/>

			<IconTimerSettings/>
			<IconFullscreen/>
		</div>
	</div>
</template>

<script>
import store from '@/store';

import TheTimerScramble from '@/components/TheTimerScramble.vue';
import TheTimerClock from '@/components/TheTimerClock.vue';
import IconPenalizeSolve from '@/components/IconPenalizeSolve.vue';
import IconDeleteSolve from '@/components/IconDeleteSolve.vue';
import IconTimerSettings from '@/components/IconTimerSettings.vue';
import IconFullscreen from '@/components/IconFullscreen.vue';

import addSolve from '@/mixins/addSolve';
import inert from '@/mixins/inert';

function newSolveData() {
	return {
		solveId: String(Date.now()),
		solve: {
			session: store.state.currentSession,
			scramble: [],
			time: null,
			dnf: false,
			p2: false,
		},
	};
}

export default {
	name: 'TheTimer',
	mixins: [addSolve, inert],
	components: {
		TheTimerScramble,
		TheTimerClock,
		IconPenalizeSolve,
		IconDeleteSolve,
		IconTimerSettings,
		IconFullscreen,
	},
	data() {
		return {
			status: 'idle',
			previousSolveId: null,
			...newSolveData(),
		};
	},
	computed: {
		currentSession() {
			return this.$store.state.currentSession;
		},
	},
	methods: {
		addSolve(time) {
			this.solve.time = time;
			this.$_addSolve(this.solveId, this.solve);
			this.resetSolve();
		},
		resetSolve() {
			this.previousSolveId = this.solveId;
			Object.assign(this.$data, newSolveData());
		},
		onDeleted() {
			this.status = 'idle';
			this.previousSolveId = null;
		},
		toggleFullscreen() {
			this.$store.commit('setFullscreen', !this.$store.state.settings.isFullscreen);
		},
		deleteSolve() {
			if (this.status !== 'complete') return;

			this.$store.commit('removeSolve', this.previousSolveId);
			this.onDeleted();
		},
		toggleP2() {
			if (this.status !== 'complete') return;

			this.$store.commit('setSolveP2', {
				id: this.previousSolveId,
				value: !this.$store.state.solves[this.previousSolveId].p2,
			});
		},
		toggleDnf() {
			if (this.status !== 'complete') return;

			this.$store.commit('setSolveDnf', {
				id: this.previousSolveId,
				value: !this.$store.state.solves[this.previousSolveId].dnf,
			});
		},
		keydownHandler(event) {
			// Only continue if this is not inert
			if (this.$_isInert(this.$refs.timer)) return;

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
	},
	watch: {
		currentSession() {
			this.resetSolve();
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
.timer {
	padding: 1.5rem 0;
}

.actions {
	padding: 0 1.5rem;
	display: flex;
	justify-content: center;
}

.actions > * + * {
	margin-left: .75rem;
}
</style>
