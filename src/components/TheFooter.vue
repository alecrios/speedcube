<template>
	<footer class="footer">
		<BaseWrapper>
			<div class="bar">
				<span class="item">
					&copy; {{ new Date().getFullYear() }}
					<a
						href="https://alecrios.com"
						target="_blank"
						rel="noopener">Alec Rios</a>
				</span>

				<span class="item">
					<a
						href="https://alecrios.com/contact"
						target="_blank"
						rel="noopener"
					>{{ $t('contact') }}</a>
				</span>

				<span class="item">
					<button @click="showLocaleModal = true">{{ $t('language') }}</button>

					<Portal to="modals" v-if="showLocaleModal">
						<ModalLocale
							v-if="showLocaleModal"
							@close="showLocaleModal = false"
						/>
					</Portal>
				</span>
			</div>
		</BaseWrapper>
	</footer>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import ModalLocale from '@/components/ModalLocale.vue';

export default {
	name: 'TheFooter',
	components: {
		BaseWrapper,
		ModalLocale,
	},
	data() {
		return {
			showLocaleModal: false,
		};
	},
};
</script>

<style scoped>
.footer {
	background-color: var(--color-slate);
	border-top: .125rem solid var(--color-slate-lighter);
	border-bottom: .125rem solid var(--color-slate-darker);
}

.bar {
	display: flex;
	justify-content: center;
	padding: .75rem;
}

.item {
	font-size: .75rem;
	line-height: 1rem;
	letter-spacing: .03125rem;
	color: var(--color-smoke);
}

.item + .item {
	margin-left: 1.5rem;
}

.item a,
.item button {
	color: inherit;
	cursor: pointer;
}

.item a:hover,
.item button:hover {
	text-decoration: underline;
}
</style>
