<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('renameSession')" type="h2"/>
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
		</div>

		<div class="footer">
			<BaseButton :name="$t('save')" type="primary" @click="submit()"/>
			<BaseButton :name="$t('cancel')" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import moment from 'moment';

export default {
	name: 'ModalEditSession',
	props: ['session-id'],
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
			this.$store.commit('renameSession', {
				id: this.sessionId,
				name: this.name || moment().format('YYYY-MM-DD'),
			});

			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
