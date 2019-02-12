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

			<div class="field">
				<BaseLabel name="File Type"/>

				<BaseSelect
					name="File Type"
					v-model="fileType"
					:options="fileTypes"
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
import getScrambleTurnText from '@/mixins/getScrambleTurnText';

export default {
	name: 'ModalExportSession',
	mixins: [modalComponents, getScrambleTurnText],
	data() {
		return {
			exportTypes: [
				{label: 'Times Only', value: 'timesOnly'},
				{label: 'Times and Scrambles', value: 'timesAndScrambles'},
			],
			fileTypes: [
				{label: 'CSV', value: 'csv'},
				{label: 'JSON', value: 'json'},
			],
			session: this.$store.state.currentSession,
			exportType: 'timesOnly',
			fileType: 'csv',
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
		csv() {
			let data;

			if (this.exportType === 'timesAndScrambles') {
				data = 'Time, Scramble\n';
				data += this.solves
					.map((solve) => (
						`${this.formatTime(solve)}, ${this.formatScramble(solve)}`
					))
					.join('\n');
			} else if (this.exportType === 'timesOnly') {
				data = 'Time\n';
				data += this.solves
					.map((solve) => (
						`${this.formatTime(solve)}`
					))
					.join('\n');
			}

			return data;
		},
		json() {
			let data;

			if (this.exportType === 'timesAndScrambles') {
				data = JSON.stringify(this.solves.map((solve) => ({
					time: this.formatTime(solve),
					scramble: this.formatScramble(solve),
				})));
			} else if (this.exportType === 'timesOnly') {
				data = JSON.stringify(this.solves.map((solve) => this.formatTime(solve)));
			}

			return data;
		},
	},
	methods: {
		formatTime(solve) {
			return solve.dnf ? 'DNF' : this.$options.filters.formatTime(solve.time);
		},
		formatScramble(solve) {
			return solve.scramble.map((turn) => this.$_getScrambleTurnText(turn)).join(' ');
		},
		exportSession() {
			const data = this[this.fileType];
			const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
			saveAs(blob, `${kebabCase(this.sessionName)}.${this.fileType}`);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
