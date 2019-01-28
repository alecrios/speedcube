<template>
	<div>
		<TheTimerScramble/>

		<TheTimerClock/>
	</div>
</template>

<script>
import TheTimerScramble from '@/components/TheTimerScramble.vue';
import TheTimerClock from '@/components/TheTimerClock.vue';

export default {
	name: 'TheTimer',
	components: {
		TheTimerScramble,
		TheTimerClock,
	},
	methods: {
		addSolve() {
			const id = String(Date.now());
			const session = this.$store.state.currentSession;
			this.$store.commit('addSolve', {id, session});
			this.$root.$emit('reset');
		},
	},
	created() {
		this.$root.$on('timer-ended', this.addSolve);
	},
	beforeDestroy() {
		this.$root.$off('timer-ended', this.addSolve);
	},
};
</script>
