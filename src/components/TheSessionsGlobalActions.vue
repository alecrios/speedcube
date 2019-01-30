<template>
	<GlobalActions>
		<BaseButton
			name="New Session"
			icon="add"
			@click="() => { this.$_addSession(); }"
		/>
	</GlobalActions>
</template>

<script>
import GlobalActions from '@/components/GlobalActions.vue';
import BaseButton from '@/components/BaseButton.vue';

import addSession from '@/mixins/addSession';

export default {
	name: 'TheSessionsGlobalActions',
	mixins: [addSession],
	components: {
		GlobalActions,
		BaseButton,
	},
};
</script>

<style scoped>

</style>
