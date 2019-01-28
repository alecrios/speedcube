<template>
	<GlobalActions>
		<BaseButton
			name="New Solve"
			icon="add"
			@click="createNewSolve()"
		/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'TheSolvesGlobalActions',
	components: {
		GlobalActions,
		BaseButton,
	},
	methods: {
		createNewSolve() {
			this.$router.push('/');
		},
	},
};
</script>

<style scoped>

</style>
