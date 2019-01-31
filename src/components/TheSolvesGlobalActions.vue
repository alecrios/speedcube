<template>
	<GlobalActions>
		<BaseButton
			name="New Solve"
			:has-icon="true"
			icon="add"
			@click="() => { this.$router.push('/'); }"
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
};
</script>

<style scoped>

</style>
