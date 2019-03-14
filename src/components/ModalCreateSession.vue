<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('createSession')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel
					field-id="session-name"
					:name="$t('sessionName')"
				/>

				<BaseInput
					id="session-name"
					:name="$t('sessionName')"
					:placeholder="getDateString()"
					v-model="name"
					@submit="submit()"
				/>
			</div>

			<div class="field">
				<BaseLabel
					field-id="cube-type"
					:name="$t('cubeType')"
				/>

				<BaseSelect
					id="cube-type"
					:name="$t('cubeType')"
					v-model="cubeSize"
					:options="cubeSizes"
					@submit="submit()"
				/>
			</div>
		</div>

		<div class="footer">
			<BaseButton :name="$t('submit')" type="primary" @click="submit()"/>
			<BaseButton :name="$t('cancel')" type="secondary" @click="$emit('close')"/>
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
