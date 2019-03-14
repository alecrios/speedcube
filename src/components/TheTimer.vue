<template>
	<div class="timer">
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
	mixins: [addSolve],
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
	},
	watch: {
		currentSession() {
			this.resetSolve();
		},
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
