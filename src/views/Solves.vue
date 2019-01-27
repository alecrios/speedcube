<template>
	<div>
		<EmptyContent v-if="!solves.length" message="No solves to display."/>

		<TheSolves v-if="solves.length"/>
	</div>
</template>

<script>
import EmptyContent from '@/components/EmptyContent.vue';
import TheSolves from '@/components/TheSolves.vue';

export default {
	name: 'solves',
	components: {
		EmptyContent,
		TheSolves,
	},
	computed: {
		solves() {
			return this.$store.getters.solves;
		},
	},
};
</script>
