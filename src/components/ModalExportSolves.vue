<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('exportSolves')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseLabel
					field-id="file-name"
					:name="$t('fileName')"
				/>

				<BaseInput
					id="file-name"
					:name="$t('fileName')"
					:placeholder="sessionName"
					v-model="fileName"
					@submit="submit()"
				/>
			</div>

			<div class="field">
				<BaseLabel
					field-id="file-type"
					:name="$t('fileType')"
				/>

				<BaseSelect
					id="file-type"
					:name="$t('fileType')"
					v-model="fileType"
					:options="fileTypes"
					@submit="submit()"
				/>
			</div>

			<div class="field">
				<BaseLabel
					field-id="export-type"
					:name="$t('exportType')"
				/>

				<BaseSelect
					id="export-type"
					:name="$t('exportType')"
					v-model="exportType"
					:options="exportTypes"
					@submit="submit()"
				/>
			</div>
		</div>

		<div class="footer">
			<BaseButton :name="$t('export')" type="primary" @click="exportSolves()"/>
			<BaseButton :name="$t('cancel')" type="secondary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
import {saveAs} from 'file-saver';
import filenamify from 'filenamify';

import formatTime from '@/utils/formatTime';

export default {
	name: 'ModalExportSolves',
	data() {
		return {
			fileName: this.$store.state.sessions[this.$store.state.currentSession].name,
			fileType: 'csv',
			exportType: 'timesOnly',
		};
	},
	computed: {
		exportTypes() {
			return [
				{label: this.$t('timesOnly'), value: 'timesOnly'},
				{label: this.$t('timesAndScrambles'), value: 'timesAndScrambles'},
			];
		},
		fileTypes() {
			return [
				{label: this.$t('csv'), value: 'csv'},
				{label: this.$t('json'), value: 'json'},
			];
		},
		sessionId() {
			return this.$store.state.currentSession;
		},
		sessionName() {
			return this.$store.state.sessions[this.sessionId].name;
		},
		solves() {
			return this.$store.state.solveIds
				.filter((solveId) => this.$store.state.solves[solveId].session === this.sessionId)
				.map((solveId) => this.$store.state.solves[solveId]);
		},
		csv() {
			let data;

			if (this.exportType === 'timesAndScrambles') {
				data = '"Time", "Scramble"\n';
				data += this.solves
					.map((solve) => (
						`"${this.formatTime(solve)}", "${solve.scramble}"`
					))
					.join('\n');
			} else if (this.exportType === 'timesOnly') {
				data = '"Time"\n';
				data += this.solves
					.map((solve) => (
						`"${this.formatTime(solve)}"`
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
					scramble: solve.scramble,
				})));
			} else if (this.exportType === 'timesOnly') {
				data = JSON.stringify(this.solves.map((solve) => this.formatTime(solve)));
			}

			return data;
		},
	},
	methods: {
		formatTime(solve) {
			return formatTime(solve);
		},
		exportSolves() {
			const fileName = filenamify(this.fileName || this.sessionName, {replacement: '-'});
			const data = this[this.fileType];
			const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
			saveAs(blob, `${fileName}.${this.fileType}`);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>

</style>
