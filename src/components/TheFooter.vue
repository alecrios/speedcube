<template>
	<footer class="footer">
		<BaseWrapper>
			<div class="bar">
				<span class="item">
					&copy;
					{{ new Date().getFullYear() }}
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
					>{{ $t('sendFeedback') }}</a>
				</span>
			</div>
		</BaseWrapper>
	</footer>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';

export default {
	name: 'TheFooter',
	components: {
		BaseWrapper,
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
	text-align: center;
	padding: .75rem;
}

.item {
	font-size: .75rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: var(--color-smoke);
}

.item + .item {
	margin-left: 1.5rem;
}

.item a:hover {
	text-decoration: underline;
}
</style>
