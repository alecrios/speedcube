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

import modalComponents from '@/mixins/modalComponents';
import addSession from '@/mixins/addSession';
import cubeSizes from '@/mixins/cubeSizes';

export default {
	name: 'ModalCreateSession',
	mixins: [modalComponents, addSession, cubeSizes],
	data() {
		return {
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
