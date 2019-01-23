<template>
	<div>
		<Scramble :scramble="currentSolve.scramble"/>
		<Time :time="currentSolve.time"/>
		<Stats/>
	</div>
</template>

<script>
import Scramble from '@/components/Scramble.vue';
import Time from '@/components/Time.vue';
import Stats from '@/components/Stats.vue';

export default {
	name: 'home',
	components: {
		Scramble,
		Time,
		Stats,
	},
	data() {
		return {
			currentSolve: {
				scramble: [],
				time: null,
			},
		};
	},
	methods: {
		updateScramble(scramble) {
			this.currentSolve.scramble = scramble;
		},
		saveTime(time) {
			this.currentSolve.time = time;

			this.$store.commit('addSolve', Object.assign({
				timestamp: Date.now(),
			}, this.currentSolve));

			this.$root.$emit('reset');
		},
	},
	created() {
		this.$root.$on('new-scramble', this.updateScramble);
		this.$root.$on('timer-ended', this.saveTime);
	},
	beforeDestroy() {
		this.$root.$off('new-scramble', this.updateScramble);
		this.$root.$off('timer-ended', this.saveTime);
	},
};
</script>
