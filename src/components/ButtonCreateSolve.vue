<template>
	<BaseButton
		name="New Solve"
		:has-icon="true"
		icon="add"
		@click="() => { this.$router.push('/'); }"
	/>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
	name: 'ButtonCreateSolve',
	components: {
		BaseButton,
	},
};
</script>

<style scoped>

</style>
