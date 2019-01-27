<template>
	<div>
		<EmptyContent v-if="!solves.length" message="No stats to display."/>

		<TheStats v-if="solves.length"/>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';
import TheStats from '@/components/TheStats.vue';

export default {
	name: 'stats',
	components: {
		EmptyContent,
		TheStats,
	},
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
};
</script>
