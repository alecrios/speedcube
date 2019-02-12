<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading value="Export Session" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel name="Session"/>

				<BaseSelect
					name="Session"
					v-model="session"
					:options="sessions"
				/>
			</div>

			<div class="field">
				<BaseLabel name="Export Type"/>

				<BaseSelect
					name="Export Type"
					v-model="exportType"
					:options="exportTypes"
				/>
			</div>
		</div>

		<div class="footer">
			<BaseButton name="Export" type="primary" @click="exportSession()"/>
			<BaseButton name="Cancel" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import {saveAs} from 'file-saver';
import kebabCase from 'lodash.kebabcase';

import modalComponents from '@/mixins/modalComponents';

export default {
	name: 'ModalExportSession',
	mixins: [modalComponents],
	data() {
		return {
			exportTypes: [
				{label: 'All Data (importable)', value: 'allData'},
				{label: 'Times Only (not importable)', value: 'timesOnly'},
			],
			session: this.$store.state.currentSession,
			exportType: 'allData',
		};
	},
	computed: {
		sessions() {
			return this.$store.state.sessionIds.map((sessionId) => ({
				value: sessionId,
				label: this.$store.state.sessions[sessionId].name,
			}));
		},
		sessionName() {
			return this.$store.state.sessions[this.session].name;
		},
		solves() {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session === this.session)
				.map((solveId) => this.$store.state.solves[solveId]);
		},
	},
	methods: {
		exportSession() {
			let data;

			if (this.exportType === 'allData') {
				data = window.btoa(JSON.stringify(this.solves.map((solve) => ({
					time: solve.time,
					scramble: solve.scramble,
					dnf: solve.dnf,
					p2: solve.p2,
				}))));
			} else if (this.exportType === 'timesOnly') {
				data = this.solves
					.map((solve) => (solve.dnf ? 'DNF' : this.$options.filters.formatTime(solve.time)))
					.join('\n');
			}

			const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
			saveAs(blob, `${kebabCase(this.sessionName)}.txt`);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
