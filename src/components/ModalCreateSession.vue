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
					field-id="puzzle-type"
					:name="$t('puzzleType')"
				/>

				<BaseSelect
					id="puzzle-type"
					:name="$t('puzzleType')"
					:options="puzzleTypes"
					v-model="puzzleType"
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

import addSession from '@/mixins/addSession';

import puzzleTypes from '@/puzzleTypes';

export default {
	name: 'ModalCreateSession',
	mixins: [addSession],
	data() {
		return {
			name: this.getDateString(),
			puzzleTypes,
			puzzleType: '3x3x3',
		};
	},
	methods: {
		getDateString() {
			return moment().format('YYYY-MM-DD');
		},
		submit() {
			this.$_addSession({
				name: this.name,
				puzzleType: this.puzzleType,
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
