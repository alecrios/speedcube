<template>
	<GlobalActions>
		<BaseButton
			name="New Session"
			icon="add"
			@click="createNewSession()"
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
	methods: {
		createNewSession() {
			this.addSession();
		},
	},
};
</script>

<style scoped>

</style>
