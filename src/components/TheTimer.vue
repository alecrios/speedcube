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
			this.$store.commit('addSolve');
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
