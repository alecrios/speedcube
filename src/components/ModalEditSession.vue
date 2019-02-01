<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Create Session" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel name="Session Name"/>
				<BaseInput name="Session Name" :placeholder="getDateString()" v-model="name"/>
			</div>

			<div class="field">
				<BaseLabel name="Cube Type"/>
				<BaseSelect name="Cube Type" v-model="cubeSize" :options="cubeSizes"/>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Submit" type="primary" @click="submit()"/>
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
import BaseSelect from '@/components/BaseSelect.vue';
import BaseButton from '@/components/BaseButton.vue';

import addSession from '@/mixins/addSession';

export default {
	name: 'ModalEditSession',
	mixins: [addSession],
	components: {
		BaseModal,
		BaseHeading,
		BaseLabel,
		BaseInput,
		BaseSelect,
		BaseButton,
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
