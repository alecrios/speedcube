<template>
	<BaseModal @close="$emit('close')">
		<h1>Create New Session</h1>

		<BaseInput
			:placeholder="getDateString()"
			v-model="name"
		/>

		<BaseSelect
			v-model="cubeSize"
			:options="cubeSizes"
		/>

		<button @click="$emit('close')">Cancel</button>
		<button @click="submit()">Submit</button>
	</BaseModal>
</template>

<script>
import moment from 'moment';

import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import addSession from '@/mixins/addSession';

export default {
	name: 'ModalNewSession',
	mixins: [addSession],
	components: {
		BaseModal,
		BaseInput,
		BaseSelect,
	},
	data() {
		return {
			cubeSizes: [
				{label: '2×2×2', value: '2'},
				{label: '3×3×3', value: '3'},
				{label: '4×4×4', value: '4'},
				{label: '5×5×5', value: '5'},
			],
			name: this.getDateString(),
			cubeSize: '3',
		};
	},
	methods: {
		getDateString() {
			return moment().format('YYYY-MM-DD');
		},
		submit() {
			this.$_addSession({
				name: this.name,
				cubeSize: this.cubeSize,
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
