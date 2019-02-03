<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Rename Session" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel name="Session Name"/>
				<BaseInput name="Session Name" :placeholder="getDateString()" v-model="name"/>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Save" type="primary" @click="submit()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import moment from 'moment';

import BaseModal from '@/components/BaseModal.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseLabel from '@/components/BaseLabel.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

import renameSession from '@/mixins/renameSession';

export default {
	name: 'ModalEditSession',
	mixins: [renameSession],
	props: ['session-id'],
	components: {
		BaseModal,
		BaseHeading,
		BaseLabel,
		BaseInput,
		BaseButton,
	},
	data() {
		return {
			name: this.$store.state.sessions[this.sessionId].name,
		};
	},
	methods: {
		getDateString() {
			return moment().format('YYYY-MM-DD');
		},
		submit() {
			this.$_renameSession({
				id: this.sessionId,
				name: this.name,
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
