<template>
	<BaseModal @close="$emit('close')">
		<div class="header">
			<BaseHeading :value="$t('help')" type="h2"/>
		</div>

		<div class="body">
			<div class="field">
				<BaseTable>
					<thead>
						<tr>
							<th>{{ $t('hotkey') }}</th>
							<th>{{ $t('action') }}</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td><kbd>space</kbd></td>
							<td>{{ $t('controlTimer') }}</td>
						</tr>

						<tr>
							<td><kbd>1</kbd></td>
							<td>{{ $t('markSolveOk') }}</td>
						</tr>

						<tr>
							<td><kbd>2</kbd></td>
							<td>{{ $t('markSolvePlus2') }}</td>
						</tr>

						<tr>
							<td><kbd>3</kbd></td>
							<td>{{ $t('markSolveDnf') }}</td>
						</tr>

						<tr>
							<td><kbd>x</kbd></td>
							<td>{{ $t('deleteSolve') }}</td>
						</tr>

						<tr>
							<td><kbd>f</kbd></td>
							<td>{{ $t('toggleFullscreen') }}</td>
						</tr>
					</tbody>
				</BaseTable>
			</div>
		</div>

		<div class="footer">
			<BaseButton :name="$t('ok')" type="primary" @click="$emit('close')"/>
		</div>
	</BaseModal>
</template>

<script>
export default {
	name: 'ModalTimerHelp',
};
</script>

<style scoped>
kbd {
	display: inline-block;
	background-color: var(--color-slate-lighter);
	padding: .25rem .375rem;
	font-size: .75rem;
	line-height: .75rem;
	text-transform: uppercase;
	letter-spacing: .0625rem;
	font-weight: 500;
	color: var(--color-white);
	border-radius: .25rem;
}
</style>
