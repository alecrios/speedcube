<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Import Session" type="h2"/>
		</div>

		<div class="body">
			<BaseFileInput @change="onChange"/>
		</div>

		<div class="footer">
			<BaseButton name="Import" type="primary" @click="importSession()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import BaseFileInput from '@/components/BaseFileInput.vue';

import modalComponents from '@/mixins/modalComponents';

export default {
	name: 'ModalImportSession',
	mixins: [modalComponents],
	components: {
		BaseFileInput,
	},
	data() {
		return {
			file: null,
		};
	},
	methods: {
		onChange(event) {
			if (!event.target.files.length) return;

			// eslint-disable-next-line
			this.file = event.target.files[0];
		},

		importSession() {
			const reader = new FileReader();

			reader.onload = (event) => {
				const data = JSON.parse(window.atob(event.target.result));
				console.log(data);
			};

			reader.onerror = (error) => console.log(error);

			reader.readAsText(this.file);

			// this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
