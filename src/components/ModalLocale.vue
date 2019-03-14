<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('changeLanguage')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel
					field-id="locale"
					:name="$t('language')"
				/>

				<BaseSelect
					id="locale"
					:name="$t('language')"
					v-model="locale"
					:options="locales"
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
import modalComponents from '@/mixins/modalComponents';
import localization from '@/localization';

export default {
	name: 'ModalLocale',
	mixins: [modalComponents],
	data() {
		return {
			locale: this.$store.state.settings.locale,
		};
	},
	computed: {
		locales() {
			return Object.keys(localization.names)
				.map((key) => ({label: localization.names[key], value: key}));
		},
	},
	methods: {
		submit() {
			this.$store.commit('setLocale', this.locale);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
